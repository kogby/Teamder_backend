import express from 'express'
import User from '../model/User'
import bcrypt from 'bcrypt'
const router = express.Router();
const saltRounds = 10;
const loginVerify = async(email , passward)=>{
    try{
        let result;
        const loginUser = await User.findOne({email})
        if(loginUser !== null){
            const pass = await bcrypt.compare(passward, loginUser.passward);
            if(pass){
                result = {pass: true , message: "Login success!",userId: loginUser._id }
            }
            else{
                result = {pass: false , message: "Your passward is wrong!"}
            }
        }
        else{
            result = {pass: false , message: "User doesn't exist!"};
        }
        return result;
    }
    catch(e){
        throw new Error("Database create user error " + e);
    }
}
router.get('/verify',async(req, res) => {
    try{
        let loginUser = {email: req.query.email, passward: req.query.passward};
        console.log(loginUser);
        let result = await loginVerify(loginUser.email , loginUser.passward);
        console.log(result);
        res.status(200).send({ pass: result.pass , message: result.message, userId:result.userId});
    }
    catch(e){
        res.status(403).send({message: "error"});
    }
})


export default router;