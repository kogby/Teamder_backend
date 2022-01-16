import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
        requestId: {type: Schema.Types.ObjectId, ref:'Request',required: true},
        userId: {type: Schema.Types.ObjectId, ref:'User',required: true},
        content: {type: String, required: true},
    },{
        collection: 'Comment',
        timestamps: true,
    });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;