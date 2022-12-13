require("dotenv").config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const authorize = require('../middlewares/authorize')
const Role = require('../middlewares/role')
const roleAccessControl = require('../roleAccessControl')

exports.createUser = async (req, res) => {
    const { username, password } = req.body
    // user registration validation
    if (!username) {
		return res.json({ status: 'error', error: 'Empty username' })
	}
    if (!password) {
		return res.json({ status: 'error', error: 'Empty password' })
	}
    if (password.length < 8) {
		return res.json({
			status: 'error',
			error: 'Password should be atleast 8 characters'
		})
	}
    // encrypt the password
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = User({
        username: username,
        password: hashpassword,
        role: Role.User
    })
    const accessToken = jwt.sign({ id: newUser._id}, process.env.SECRET, {expiresIn: "1d"})
    newUser.accessToken = accessToken;
    newUser
        .save()
        .then((data) => {
            res.status(201).json({ user: newUser, accessToken });
        })
        .catch((err) => {
            if (err.code == 11000)
            {
                res.json({ status: 'error', error: 'Username already in use' })
            } else
            {
                res.json({ status: 'error', error: err })
            }
        })
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ "username": username }).lean()

    if (!user) {
        return res.status(500).json({ status: 'error', error: "Username doesn't exist" })
    }

    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: "1d"
           })
        await User.findByIdAndUpdate(user._id, {accessToken}) //update token
        return res.status(200).json({ data: { user }, accessToken })
    } else {
        return next(new Error('Password is not correct'))
    }
    
}

exports.getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
}

exports.getUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    console.log('hit delete')
    var userId = req.params.id;
    
    //Inside the find we need to ensure that the current user is the creator of the publication
    User.find({'_id': userId}).remove(err => {
        if (err) return res.status(500).send({message: 'Error deleting the user'});        
        return res.status(200).send({message: 'User successfully deleted'});
    });
}

exports.updateUser = async (req, res, next)=> {
        var userId = req.params.id;
        var update = req.body;
        
        if(userId != req.user._id){
            return res.status(500).send({message: 'You don´t have permission to update other user data '});
        }

        User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) => {
            if(err) return res.status(500).send({message: 'Request error'});
            if(!userUpdated) return res.status(404).send({message: 'Can´t update the user'});
            return res.status(200).send({user: userUpdated});
        });  

}

    