Email Builder Next.js Application

Overview

The Email Builder application is a Next.js project that allows users to create and store email templates in a MongoDB database. The app includes features for managing email content, ensuring data validation, and provides API endpoints for saving email templates.

Features

Create and save email templates with fields such as:

Title

Content

Image URL (optional)

Footer (optional)

Server-side API for handling email data.

Database connectivity using MongoDB.

Data validation for required fields.

Error handling for API requests.

Technologies Used

Frontend

Next.js - React framework for server-rendered applications.

Backend

MongoDB - NoSQL database for storing email templates.

Mongoose - Object Data Modeling (ODM) library for MongoDB.

API

next/server - For API routing and request handling.

Language

TypeScript - For static type-checking and better code maintainability.

Installation

Clone the repository:

git clone https://github.com/shashikumarverma1/EmailBuilders
cd 

Install dependencies:

npm install

Set up environment variables:
Create a .env.local file in the root directory and add the following:

MONGO_URI=''

Run the development server:

npm run dev

The application will be available at http://localhost:3000.
