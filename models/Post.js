import mongoose from 'mongoose'

const PostShema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
		unique: true,
	},
	tags: {
		type: Array,
		default: [],
	},
	viewsCount: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	imageUrl: String,
},
	{ timestaps: true }
)

export default mongoose.model('Post', PostShema)