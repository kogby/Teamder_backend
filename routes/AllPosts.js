import express from 'express'
import Request from '../model/Request'

const router = express.Router()

const findAllPost = async()=> {
    try{
        const allPost = await Request.find({}).sort({ 'timestamps': -1 });
        const result = {msg: "sucess" , data: allPost}
        return result ;
    }
    catch(e){
        throw new Error("Database find allpost failed") ;
    }
}

router.get('/' , async(_ , res) => {
    try{
        const result = await findAllPost() ;
        res.status(200).send({message: result.msg , data: result.data}) ;
    }
    catch(e){
        res.status(403).send({message: "error" , data: null}) ;
    }
})

export default router