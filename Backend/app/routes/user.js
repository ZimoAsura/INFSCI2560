const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const authorize = require('../middlewares/authorize')

router.post('/api/register', userController.createUser)
router.post('/api/login', userController.login)
router.get('/api/user/:userId', userController.getUser);
router.delete('/api/deleteUser/:id', authorize.allowIfLoggedin, userController.deleteUser);
router.get('/api/users', authorize.allowIfLoggedin, authorize.grantAccess('readAny', 'user'), userController.getUsers);
router.put('/api/update-user/:id', authorize.allowIfLoggedin, userController.updateUser);


module.exports = router