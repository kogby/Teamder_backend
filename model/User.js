import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new Schema({
        name: String,
        email: { type: String, unique: true, lowercase: true},
        passward: String,
        fbLink: String
    },{
        collection: 'User',
        timestamps: true,
    });

const User = mongoose.model('User', UserSchema);
export default User;

