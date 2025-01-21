import dbConnect from '@/lib/db';
import mongoose, { Document, Model } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Define the schema interface
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

// Define the POST function with type annotations
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Connect to the database
  await dbConnect();

  try {
    // Parse the request body
    const body = await request.json();

    console.log('Received request body:', body);

    // Validate the request body
    const { title, content } = body;
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Save the new email document
    const newEmail = new EmailModel(body);
    await newEmail.save();

    // Return a success response
    return NextResponse.json(
      { message: 'Email data saved successfully', data: newEmail },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error handling POST request:', error);

    // Return a 500 error response
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
