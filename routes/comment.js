import express from 'express'
import Comment from '../model/Comment'
const router = express.Router();

router.post('/createComment', async(req,res) => {
  try{
    const newComment = new Comment({
      requestId: req.body.requestId, userId: req.body.myId, 
      content: req.body.content
    })
    console.log("Created New Comment", newComment);
    newComment.save();
    res.status(200).send({message: "success"});
  }
  catch(e){
    res,status(403).send({message: "create comment error"});
  }
})

const findAllComments = async(req)=> {
    try{
        const allComments = await Comment.find({requestId: req}).sort({ 'timestamp': 1 });
        const result = {msg: "sucess" , data: allComments}
        return result ;
    }
    catch(e){
        throw new Error("Database find allpost failed") ;
    }
}

router.get('/request/:requestId/comment',async(req, res) => {
  try{
    let requestId = req.params.requestId;
    const result = await findAllComments(requestId);
    res.status(200).send({message: result.msg, data: result.allComments});
  }
  catch(e){
    res.status(403).send({message: "Get commentData error"});
  }
})
router.delete('/deleteComment', async(req, res) => {
  let commentId = req.params.commentId;
  Request.findByIdAndDelete(commentId, function(err,docs){
    if(err){
      console.log(err)
      res.status(403).send({message: "delete comment failed"})
    }
    else{
      console.log("Deleted: ",docs);
      res.status(200).send({message: "success"})
    }
  })
})
export default router