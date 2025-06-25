import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const uri = import.meta.env.VITE_MONGO_URI || "";
        await mongoose.connect(uri);
        console.log('mongo connected');
    } catch(e) {
        console.log(`Error connecting to MONGO DB: ${e}`);
        process.exit(1)
    }
}

export default connectDB;