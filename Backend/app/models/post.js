const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
	{
		Titel: { type: String, required: true, unique: true },
        Content: { type: String, required: true, unique: true },
        PosterUserName: { type: String, required: true },
        Tags: [String],
        LikeCount: {
            type: Number,
            default: 0,
        },
        CreatedAt: {
            type: Date,
            default: new Date(),
            required: true
        },
	},
	{ collection: 'posts' }
);

module.exports = mongoose.model('PostSchema', PostSchema);