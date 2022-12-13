const Post = require("../models/post")
const moment = require("moment");

exports.getPosts = async (req, res) => {

    const posts = await Post.find({}).sort('-created_at').populate('user');

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

// exports.getPost = async (req, res) => {}
// exports.updatePost = async (req, res) => {}
// exports.deletePost = async (req, res) => {}
// exports.likePost = async (req, res) => {}
// exports.comment = async (req, res) => {}