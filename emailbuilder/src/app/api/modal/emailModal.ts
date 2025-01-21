import mongoose, { Document, Model } from 'mongoose';
interface Email extends Document {
    title: string;
    content: string;
    imageUrl?: string; // Optional field
    footer?: string; // Optional field
  }
  
  // Define the Mongoose schema
  const emailSchema = new mongoose.Schema<Email>({
    title: {
      type: String,
      required: true, // Ensure required fields are set
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    footer: {
      type: String,
    },
  });
  
  // Prevent model overwrite during hot-reloading
  export const EmailModel: Model<Email> =
    mongoose.models.Email || mongoose.model<Email>('Email', emailSchema);
  