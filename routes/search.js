import express from 'express'
import Request from '../model/Request'
const router = express.Router();

const findNameRequests = async(req) => {
    try{
        const nameRequests = await Request.find({className: req}).sort({'timestamp': 1});
        const result = {msg: 'success' , data: nameRequests}
        return result ;
    }
    catch(e) {
        throw new Error("Database find nameRequests failed")
    }
}