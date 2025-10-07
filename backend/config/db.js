const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
const database=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database is connected successfully")
    }
    catch(error){
        console.log("database connection error",error)
    }
}
module.exports=database;