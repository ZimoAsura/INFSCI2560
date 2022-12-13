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
// router.get('/api/posts/:id', PostController.getPost)
// router.post('/api/createpost', authorize.allowIfLoggedin, authorize.grantAccess('createOwn', 'profile'),PostController.createPost)
// router.patch('/api/posts/:id', authorize.allowIfLoggedin, authorize.grantAccess('updateOwn', 'profile'),PostController.updatePost)
// router.delete('/api/posts/:id', authorize.allowIfLoggedin, authorize.grantAccess('deleteOwn', 'profile'), PostController.deletePost);
// router.patch('/api/posts/:id/likePost', authorize.allowIfLoggedin, authorize.grantAccess('updateAny', 'profile'), PostController.likePost);
// router.post('/api/posts//:id/commentPost', authorize.allowIfLoggedin, authorize.grantAccess('updateOwn', 'profile'), PostController.commentPost);

module.exports = router