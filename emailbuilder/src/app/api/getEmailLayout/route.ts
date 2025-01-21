
import dbConnect from '@/lib/db';
import {  NextResponse } from 'next/server';
import { EmailModel } from '../uploadEmailConfig/route';


export async function GET() {
 await dbConnect()
  try {


    const data = (await EmailModel?.find())?.reverse() ;
    // Example: Simulate data fetch for a given ID
    // Example: Check if data exists
    if (!data?.length) {
      return NextResponse.json(
        { message: 'Data fetched successfully', data },
        { status: 404 }
      );
    }

    // Return the fetched data
    return NextResponse.json(
      { message: 'Data fetched successfully', data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching data:', error);

    // Return a 500 error response
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
