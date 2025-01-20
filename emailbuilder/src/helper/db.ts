import mongoose from "mongoose";

export const conectDb=async()=>{
    const uri = "mongodb://localhost:27017";
    try {
   const {connection}=     await mongoose.connect(uri);
        console.log('Connected to MongoDB' );
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}