const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
        text: { type: String, required: true },
        file: { type: String, required: true, },
        created_at: { type: String},
        user: { type: mongoose.Schema.ObjectId, ref: 'UserSchema'}
	},
	{ collection: 'posts' }
);

module.exports = mongoose.model('PostSchema', PostSchema);