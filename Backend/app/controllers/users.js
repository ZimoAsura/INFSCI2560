require("dotenv").config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user")
const authorize = require('../middlewares/authorize')
const Role = require('../middlewares/role')
const roleAccessControl = require('../roleAccessControl')

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body
    // user registration validation
    if (!username) {
		return res.json({ status: 'error', error: 'Empty username' })
	}
    if (!email) {
		return res.json({ status: 'error', error: 'Empty email address' })
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
        email: email,
        password: hashpassword,
        role: Role.User
    })
    const accessToken = jwt.sign({ id: newUser._id}, process.env.SECRET, {expiresIn: "1d"})
    newUser.accessToken = accessToken;
    newUser
        .save()
        .then((data) => {
            res.status(201).json({ data: newUser, accessToken });
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
        return res.json({ status: 'error', error: "Username doesn't exist" })
    }

    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: "1d"
           })
        await User.findByIdAndUpdate(user._id, {accessToken}) //update token
        return res.status(200).json({ data: { username: user.username, role: user.role }, accessToken })
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


    