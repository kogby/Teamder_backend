import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const RequestSchema = new Schema({
        className: { type: String, required: true },
        classCode: String,
        classNumber: Number,
        maxPeople: { type: Number, required: true},
        nowPeople: { type: Number, required: true },
        context: String,
        applicants: {type: [Schema.Types.ObjectId], ref: 'User', default: []},
        status: { type: Number, default: 0},
        title: {type: String, required: true},
        userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
    },{
        collection: 'Request',
        timestamps: true,
    });

const Request = mongoose.model('Request', RequestSchema);
export default Request;