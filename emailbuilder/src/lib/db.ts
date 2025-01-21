import mongoose from "mongoose";

const dbConnect = async () => {
    const uri:any=process.env.MONGO_URI;
  
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

export default dbConnect