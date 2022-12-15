const express = require('express')
const PostController = require('../controllers/posts')
const router = express.Router()
const authorize = require('../middlewares/authorize')
const Role = require('../middlewares/role')
const { route } = require('./user')

router.get('/api/posts', PostController.getPosts)
router.post('/api/createpost', authorize.allowIfLoggedin, PostController.createPost)
router.get('/api/counters/:id?', PostController.getCounts)
router.get('/api/posts-user/:id?', PostController.getUserPosts)
router.delete('/api/delete-post/:id?', PostController.deletePost)

module.exports = router