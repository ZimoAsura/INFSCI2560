const express = require('express')
const router = express.Router()
const LikeController = require('../controllers/likes')
const authorize = require('../middlewares/authorize')


router.post('/api/addlike', authorize.allowIfLoggedin, LikeController.likePost)
router.delete('/api/dislike/:id', authorize.allowIfLoggedin, LikeController.dislikePost)
router.get('/api/post-like/:postId', LikeController.getPostLike)


module.exports = router