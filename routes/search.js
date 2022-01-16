import express from 'express'
import Request from '../model/Request'
const router = express.Router();

const findNameRequests = async(search) => {
    try{
        let result;
        const request = await Request.find({className: search}).sort({'timestamp': 1});
        let requestData = {className: request.className, classCode: request.classCode, classNumber: request.classNumber, maxPeople: request.maxPeople, nowPeople: request.nowPeople, context: request.context, title: request.title, userId: request.userId}
        result = {requestData: requestData , message : "Get requestData success!"}
        return result ;
    }
    catch(e) {
        throw new Error("Database find nameRequests failed")
    }
}

const findCodeRequests = async(search) => {
    try{
        let result;
        const request = await Request.find({classCode: search}).sort({'timestamp': 1});
        let requestData = {className: request.className, classCode: request.classCode, classNumber: request.classNumber, maxPeople: request.maxPeople, nowPeople: request.nowPeople, context: request.context, title: request.title, userId: request.userId}
        result = {requestData: requestData , message : "Get requestData success!"}
        return result ;
    }
    catch(e) {
        throw new Error("Database find codeRequests failed")
    }
}

const findNumberRequests = async(search) => {
    try{
        let result;
        const request = await Request.find({classNUmber: search}).sort({'timestamp': 1});
        let requestData = {className: request.className, classCode: request.classCode, classNumber: request.classNumber, maxPeople: request.maxPeople, nowPeople: request.nowPeople, context: request.context, title: request.title, userId: request.userId}
        result = {requestData: requestData , message : "Get requestData success!"}
        return result ;
    }
    catch(e) {
        throw new Error("Database find numberRequests failed")
    }
}

router.get('/findRequest' , async(req , res) => {
    try {
        let search = req.query.search;
        let type = req.query.type;
        if(type === 1) {
            let result = await findNameRequests(search);
            res.status(200).send({message: result.message, data: result.requestData});
        }
        else if(type === 2) {
            let result = await findCodeRequests(search);
            res.status(200).send({message: result.message, data: result.requestData});
        }
        else if(type === 3) {
            let result = await findNumberRequests(search);
            res.status(200).send({message: result.message, data: result.requestData});
        }
    }
    catch(e){
        res.status(403).send({message: "Get requestData failed"});
    }
})

export default router