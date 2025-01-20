import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json(); // Use `await request.json()` for parsing JSON body in Next.js 13+

    console.log(body, "Received request body");

    // Add your processing logic here
    // Example: Check if the required fields exist in the request body
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'Request body is empty or invalid' },
        { status: 400 }
      );
    }

    // Example: Return a success response
    return NextResponse.json(
      { message: 'File uploaded successfully', data: body },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error uploading file:', error);

    // Return a 500 error response
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
