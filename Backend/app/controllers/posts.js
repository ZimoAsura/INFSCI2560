const Post = require("../models/post")
const moment = require("moment");

exports.getPosts = async (req, res) => {

    const posts = await Post.find({}).populate('user').sort('-created_at');
    return res.status(200).send({
        posts
    });
}

exports.createPost = async (req, res) => {
    var params = req.body;
    //Check if there is a text in the request
    if(!params.text) return res.status(200).send({message: 'You need to send a text into a post'});

    var post = new Post();
    post.text = params.text;
    post.file = 'null';
    post.user = req.user._id;
    post.created_at = moment().unix();
    
    post.save((err, postStored) => {
        if (err) res.status(500).send({message: 'Error saving the post'});
        
        if(!postStored) res.status(404).send({message: 'Post not stored'});
        
        res.status(200).send({post: postStored});
    }); 
}

exports.getCounts = async (req, res) => {
    var userId;
    // var userId = req.user._id;
    if(req.params.id){
        userId = req.params.id;
    }

    var posts = await Post.count({"user": userId}).exec().then((count) => {
        return count;
    }).catch((err) => {
        return handleError(err);    
    });    
    res.status(200).send({posts: posts});
}

exports.getUserPosts = async (req, res) => {
    var user = req.params.id;
    var posts = await Post.find({user: user}).sort('-created_at').populate('user');
    res.status(200).send({posts});
}

exports.deletePost = async (req, res) => {
    var postId = req.params.id;
    Post.find({'_id': postId}).remove(err => {
        if (err) return res.status(500).send({message: 'Error deleting the post'});        
        return res.status(200).send({message: 'The post is successfully deleted'});
    });
}
