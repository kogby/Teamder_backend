import express from 'express'
import Request from '../model/Request'
const router = express.Router();

const findPersonRequests = async(userId)=>{
  try{
    const personRequests = await Request.find({userId}).sort({'timestamp': 1});
    console.log(personRequests);
    const result = {msg: 'success', data: personRequests}
    return result;
  }
  catch(e){
    throw new Error("Database find personalRequests failed");
  }
}
router.get('/personalRequest', async(req, res)=>{
  try{
    let userId = req.query.userId;
    console.log(userId);
    const result = await findPersonRequests(userId);
    res.status(200).send({message: result.msg, data: result.data});
  }
  catch(e){
    res.status(403).send({message: "Get personalRequests error"});
  }
})
router.post('/createRequest',async(req,res) => {
  try{
    const newRequest = new Request({
      className: req.body.className, classCode: req.body.classCode, classNumber: req.body.classNumber,
      maxPeople: req.body.maxPeople, nowPeople: req.body.nowPeople, context: req.body.context, title: req.body.title, userId: req.body.myId 
    })
    console.log("Created New Request",newRequest);
    newRequest.save();
    res.status(200).send({message: "success"});
  }
  catch(e){
    res.status(403).send({message: "create request error"});
  }
})

const getRequestData = async(requestId)=>{
    try{
        let result;
        const request = await Request.findById(requestId);
        let requestData = {className: request.className, classCode: request.classCode, classNumber: request.classNumber, maxPeople: request.maxPeople, nowPeople: request.nowPeople, context: request.context, title: request.title, userId: request.userId}
        result = {requestData: requestData , message : "Get requestData success!"}
        return result;
    }
    catch(e){
        throw new Error("Get requestData failed :" + e);
    }
}
router.get('/requestPage',async(req, res) => {
  try{
      let requestId = req.query.requestId;
      //console.log(requestId);
      let result = await getRequestData(requestId);
      res.status(200).send({message: result.message, data: result.requestData});
  }
  catch(e){
      res.status(403).send({message: "Get requestData failed"});
  }
})

router.delete('/deleteRequest', async(req, res) => {
  let requestId = req.params.requestId;
  Request.findByIdAndDelete(requestId, function(err,docs){
    if(err){
      console.log(err)
      res.status(403).send({message: "delete Request failed"})
    }
    else{
      console.log("Deleted: ",docs);
      res.status(200).send({message: "success"});
    }
  })
})
export default router