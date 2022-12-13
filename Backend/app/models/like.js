const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
	{
        user: { type: mongoose.Schema.ObjectId, ref: 'UserSchema'},
        post: { type: mongoose.Schema.ObjectId, ref: 'PostSchema'}
	},
	{ collection: 'likes' }
);

module.exports = mongoose.model('LikeSchema', LikeSchema);