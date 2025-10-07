// const express=require("express")
// const app=express()
// const dotenv=require("dotenv")
// const connectdb=require("./config/db")
// dotenv.config();
// const cors=require("cors")
// app.get('/',(req,res)=>{
//     res.send("get req call")
// })
// app.listen(process.env.PORT,()=>{
//     console.log(`server is runing on port ${process.env.PORT} `)
// })


const dotenv=require("dotenv")
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hii")
})
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
