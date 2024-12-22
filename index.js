import express from "express";
import env from "dotenv"
import loadDbFiles from "./database.js";
import v1Router from "./src/vRouters/v1.router.js";
import { attachGetQueryMiddleware } from "./src/middlewares/attach.query.middlewares.js";
import NotFoundService from "./src/services/not.found.services.js";
env.config();

// initiat app.
export const app=express();

// use .json middlware to handle parsing
app.use(express.json());

// vars & middlwares part
const Port=8080 || process.env.PORT;
app.use("/api/v1",v1Router);
app.get("/",attachGetQueryMiddleware("exchange"));
app.use(NotFoundService)


// global error handler
app.use((err,req,res,next)=>{
  const message=err.message;
  const statusCode=err.statusCode;
  res.status(statusCode || 500).json({message});
})

// app listener
loadDbFiles().then((res)=>{
  const {flag}=res;
  flag && app.listen(Port,()=>{
    console.log({...res,server:`server runing on port ${Port}`});
  })
}).catch((error)=>{
  console.log(error || "failed to run server");
})