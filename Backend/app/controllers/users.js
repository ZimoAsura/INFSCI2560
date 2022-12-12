const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

exports.createUser = async (req, res) => {
    const { username, password } = req.body

    // password validation
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
        password: hashpassword
    })

    newUser
        .save()
        .then((data) => {
            res.status(201).json({ status: 'ok' });
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

exports.login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ "username": username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: "Username doesn't exist" })
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET)
        return res.json({ status: 'ok', data: token })
    }
    
    res.json({ status: 'error', error: 'Wrong password' })
}

