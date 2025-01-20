import { conectDb } from '@/helper/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  conectDb()
  try {
    // Parse query parameters from the request URL
    // const { searchParams } = new URL(request.url);
    // const id = searchParams.get('id'); // Example: Fetch data by ID if provided

    // console.log(id, "Received query parameter");

    // Add your database or logic to fetch data here
    // Example: If no ID is provided, return a generic message
    // if (!id) {
    //   return NextResponse.json(
    //     { message: 'No ID provided. Fetching all data not implemented.' },
    //     { status: 400 }
    //   );
    // }

    // Example: Simulate data fetch for a given ID
    const data =[
      {
        title: 'kjjjkkjj',
        content: 'hghgg',
        imageUrl: '/uploads/1737332514167-health_care.png',
        footer: '',
        id: 'a3063127-b211-4ba1-9b29-511ab0a486df',
        created_at: '2025-01-20T00:31:07.638Z'
      },
      {
        title: 'kjjjkkjj',
        content: 'hghgg',
        imageUrl: '/uploads/1737332514167-health_care.png',
        footer: '',
        id: 'a3063127-b211-4ba1-9b29-511akb0a486df',
        created_at: '2025-01-20T00:31:07.638Z'
      },
      {
        title: 'kjjjkkjj',
        content: 'hghgg',
        imageUrl: '/uploads/1737332514167-health_care.png',
        footer: '',
        id: 'a3063127-b211-4ba1-9b29-511ab0a486dfjhh',
        created_at: '2025-01-20T00:31:07.638Z'
      }
    ]

    // Example: Check if data exists
    if (!data?.length) {
      return NextResponse.json(
        { error: 'Data not found' },
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
