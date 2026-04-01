# Task Management API

## Project Overview
This is a secure Task Management API built with Node.js and TypeScript. It is
designed to help developers manage users and events safely. This API handles 
the "back-end" work, meaning it stores data, checks for security, and provide 
information to a website. Furthermore, it uses Helmet to protect against common 
web attacks and CORS to make sure only allowed websites can talk to it. It also 
uses Firebase to keep your data saved in the cloud.

## Installation Instructions

**Prerequisites:**
- Node.js (version 14 or higher)
- npm (Node Package Manager)

**Steps to Install:**
- **step 1:** Install all required dependencies
    -npm install dotenv
- **step 2:** Create a `.env` file in the root directory of the project and add
 the following environment variables:
    - `FIREBASE_PROJECT_ID=your_firebase_project_id`
    - `FIREBASE_CLIENT_EMAIL=your_firebase_client_email`
    - `FIREBASE_PRIVATE_KEY=your_firebase_private_key`
- **step 3:** Update .gitignore to include the .env file to prevent it from being
 committed to version control.
    - Add `.env` to your .gitignore file.
- **step 4:** load the environment variables in your application by adding the 
following line at the beginning of your main application file (e.g., `app.ts`):
    - `require('dotenv').config();`
- **step 5:**Replace hardcoded  values with environment variables in your code.
 For example, if you have a Firebase configuration, it should look like this:
    ```typescript
    const firebaseConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
    ```
- **step 6:** Run the development server
    - npm run dev

## API Request Examples
Here are some examples of how to make API requests to the Task Management API:
curl -X POST http://localhost:3000/api/v1/events \
-H "Content-Type: application/json" \
- **Create a new event:**
    - Endpoint: `POST /events`
    - Request Body:
    ```json
    {
      "name": "John Doe",
      "date": "2024-07-01T10:00:00Z",
      "description": "Team meeting to discuss project updates.",
      "capacity": 20,
      "registrationCount": 15,
      "status": "active",
      "category": "workshop",
      "createdAt": "2024-07-01T10:00:00Z"
    }

    }
    ```
- **Get all events:**
    - Endpoint: `GET /events`
- **Get a specific event by ID:**
    - Endpoint: `GET /events/:id`
- **Update an event:**
    - Endpoint: `PUT /events/:id`

## Documentation Access
- GitHub Pages
https://klimarrc.github.io/back-end_development_Assignment_03_Kailine/

- Local API Documentation (Swagger)
http://localhost:3000/api-docs/

- GitHub Repository
https://github.com/klimarrc/back-end_development_Assignment_03_Kailine.git

