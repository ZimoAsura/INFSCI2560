const express = require('express')
const PostController = require('../controllers/posts')
const router = express.Router()
const authorize = require('../middlewares/authorize')
const Role = require('../middlewares/role')

router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPost);
router.post('/', PostController.createPost);
router.post('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.patch('/:id/likePost', PostController.likePost);

export default router;