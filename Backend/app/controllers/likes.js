const Like = require('../models/like');

exports.likePost = async (req, res) => {
    const {userId, postId} = req.body
    const newLike = Like({
        user: userId,
        post: postId,
    })
    newLike
        .save()
        .then((data) => {
            res.status(201).json({ like: newLike });
        })
        .catch((err) => {
            if (err)
            {
                res.json({ status: 'error', error: err })
            } 
        })
}

exports.dislikePost = async (req, res) => {
    var likeId = req.params.id;
    Like.findOne({'_id': likeId}).deleteOne(err => {
        if (err) return res.status(500).send({message: "Can't dislike the post"});        
        return res.status(200).send({message: 'dislike the post'});
    })
}

exports.getPostLike = async (req, res) => {
    var postId = req.params.postId;
    const likeCount = await Like.count({'post': postId}).exec().then((count) => {
        return count;
    }).catch((err) => {
        return handleError(err);    
    });    
    res.status(200).send({likes: likeCount});
}
