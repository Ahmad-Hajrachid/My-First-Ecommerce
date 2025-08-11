import mongoose from "mongoose"

export const connectdb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected successfully!")
    } catch (error) {
        console.error("Error connecting to Mongodb",error);
        process.exit(1)
    }
}