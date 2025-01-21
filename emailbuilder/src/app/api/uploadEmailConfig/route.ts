import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import {  NextResponse } from 'next/server';

// Define the schema
const emailSchema = new mongoose.Schema({
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
export const EmailModel :any =
  mongoose.models.Email || mongoose.model('Email', emailSchema);

export async function POST(request: { json: () => any; }) {
  // Connect to the database
  await dbConnect();

  try {
    // Parse the request body
    const body = await request.json();

    console.log('Received request body:', body);

    // Validate the request body
    const { title, content,} = body;
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
