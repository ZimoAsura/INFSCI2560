const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const authorize = require('../middlewares/authorize')
const Role = require('../middlewares/role')

router.post('/api/register', userController.createUser)
router.post('/api/login', userController.login)
router.get('/api/user/:userId', authorize.allowIfLoggedin, userController.getUser);
router.get('/api/users', authorize.allowIfLoggedin, authorize.grantAccess('readAny', 'profile'), userController.getUsers);
    
module.exports = router