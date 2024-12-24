import express from "express";
import loadDbFiles from "./database.js";
import v1Router from "./src/vRouters/v1.router.js";
import NotFoundService from "./src/services/not.found.services.js";
import cors from "cors";
import env from "dotenv"
env.config();

// initiat app.
export const app=express();

// use .json middlware to handle parsing
app.use(express.json());

// welcome test endpoint
app.get("/",(req,res)=>{
  res.status(200).json({message:"welcome to the api 2025"})
});

// apply cors
const cors = require('cors');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === "https://big-data-fe.vercel.app") {

      callback(null, true);
    } else {
      callback(new Error('CORS policy: Not allowed by origin'), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
}));



// vars & middlwares part
const Port=8080 || process.env.PORT;
app.use("/api/v1",v1Router);
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