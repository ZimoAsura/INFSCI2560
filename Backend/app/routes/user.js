const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router.post('/api/register', userController.createUser)
router.post('/api/login', userController.login)
module.exports = router