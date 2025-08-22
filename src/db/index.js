import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const connectDB=async()=>{
    try {
     const connectionInstances=   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongo DB Connected !! DB Host:${connectionInstances.connection.host}`);
    } catch (error) {
        console.log("MongoDb connection error occur",error)
        process.exit(1);   // node js provide 

    }
}

export default connectDB;