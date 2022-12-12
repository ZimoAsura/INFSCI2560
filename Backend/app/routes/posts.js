import express from 'express';

import PostController from '../controllers/posts';

const router = express.Router();

router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPost);
router.post('/', PostController.createPost);
router.post('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);
router.patch('/:id/likePost', PostController.likePost);

export default router;