import express from 'express'
import User from '../model/User'
import bcrypt from 'bcrypt'
const router = express.Router();
const saltRounds = 10;
const getUserData = async(userId)=>{
    try{
        let result;
        const user = await User.findById(userId);
        let userData = {userId : user._id , email : user.email , name: user.name ,fbLink: user.fbLink}
        result = {userData: userData , message : "GetUserData success!"}
        return result;
    }
    catch(e){
        throw new Error("GetUserData failed " + e);
    }
}
router.get('/personalPage',async(req, res) => {
    try{
        let userId = req.query.userId;
        //console.log(userId);
        let result = await getUserData(userId);
        res.status(200).send({message: result.message, data: result.userData});
    }
    catch(e){
        res.status(403).send({message: "GetUserData failed"});
    }
})


const editUser = async(userId,email,name,passward,fbLink)=>{
    try{
        const user = await User.findById(userId);
        user.name = name;
        user.email = email;
        user.passward = passward;
        user.fbLink = fbLink;
        await user.save();
    }
    catch(e){
        throw new Error("Database edit user error " + e);
    }
}
router.post('/editUser',async(req, res) => {
    try{
        let newUser = {userId: req.body.userId, email: req.body.email , name: req.body.name , passward: req.body.passward, fbLink: req.body.fbLink};
        (async () => {
            const hash = await bcrypt.hash(newUser.passward, saltRounds);
            await editUser(newUser.userId , newUser.email , newUser.name , hash , newUser.fbLink);
        })()
        res.status(200).send({message: "success"});
    }
    catch(e){
        res.status(403).send({message: "error"});
    }
})


export default router;