import express from 'express'
import User from '../model/User'
import bcrypt from 'bcrypt'
const router = express.Router();
const saltRounds = 10;
const createNewUser = async(email,name,passward,fbLink)=>{
    try{
        const newUser = await new User({email,name,passward,fbLink});
        console.log("Created NewUser",newUser);
        newUser.save();
    }
    catch(e){
        throw new Error("Database create user error " + e);
    }
}
router.post('/createUser',async(req, res) => {
    try{
        let newUser = {email: req.body.email , name: req.body.name , passward: req.body.passward , fbLink: req.body.fbLink};
        (async () => {
            const hash = await bcrypt.hash(newUser.passward, saltRounds);
            await createNewUser(newUser.email , newUser.name , hash , newUser.fbLink);
        })()
        res.status(200).send({message: "success"});
    }
    catch(e){
        res.status(403).send({message: "error"});
    }
})


export default router;