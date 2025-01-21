import mongoose from "mongoose";

const dbConnect = async () => {
    const uri = "mongodb://127.0.0.1:27017/emailbuilder";

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

export default dbConnect