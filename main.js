import mongoose from './mongoose';
import express from "express";
import bodyParser from "body-parser";
import signUpRoute from "./routes/signUp";
import loginRoute from './routes/login';
import userRoute from './routes/user';
import requestRoute from './routes/request';
import commentRoute from './routes/comment';
import allPostsRoute from './routes/AllPosts';
import cors from "cors";

const app = express();
// init middleware
app.use(cors());
app.use(bodyParser.json());
// define routes
app.use('/signUp', signUpRoute);
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/request',requestRoute);
app.use('/comment',commentRoute);
app.use('/allPosts',allPostsRoute);
// define server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})