News Aggregator API
Project Overview

News Aggregator API is a RESTful API built with Node.js, Express, and MongoDB, allowing users to register, log in, set news preferences, and fetch personalized news articles from an external news provider.

This project demonstrates a full-stack backend workflow, including authentication, user-specific data storage, external API integration, input validation, and error handling.

Features

User Authentication: Register and login using JWT-based authentication.

User Preferences: Save preferred news categories and languages.

Fetch News: Retrieve news articles from NewsAPI based on user preferences.

Input Validation: Validates email format, password strength, and preferences input.

Error Handling: Handles invalid inputs, unauthorized access, and external API failures.

news-aggregator-api-Chandraja/
│
├─ src/
│   ├─ controllers/
│   │   ├─ authController.js          # User registration & login logic
│   │   └─ newsController.js          # Fetch news from external API
│   │
│   ├─ middleware/
│   │   └─ authMiddleware.js          # JWT verification
│   │
│   ├─ models/
│   │   └─ User.js                    # User schema & preferences
│   │
│   ├─ routes/
│   │   ├─ auth.js                     # Auth endpoints
│   │   ├─ preferences.js              # Preferences endpoints
│   │   └─ news.js                     # News fetching endpoint
│   │
│   ├─ config/
│   │   └─ db.js                       # MongoDB connection
│   │
│   ├─ app.js                          # Express app configuration
│   └─ server.js                       # Server entry point
│
├─ .env                                # Environment variables
├─ package.json
└─ README.md

Installed Packages

express: Web framework for Node.js.

mongoose: MongoDB object modeling.

bcryptjs: Password hashing.

jsonwebtoken: JWT token generation and verification.

axios: External HTTP requests (used for NewsAPI).

dotenv: Load environment variables.

validator: Input validation (email, password).

nodemon: Dev dependency for automatic server reload.

API Endpoints
1. User Registration

POST /api/auth/register

Body:
{
  "username": "sathya",
  "email": "sathya@example.com",
  "password": "mySuperSecretKey123"
}

2. User Login

POST /api/auth/login
Body (JSON):
{
  "email": "sathya@example.com",
  "password": "mySuperSecretKey123"
}


3. Get User Preferences

GET /api/preferences
Headers:

Authorization: Bearer <JWT_TOKEN>

4. Update User Preferences

PUT /api/preferences
Headers:

Authorization: Bearer <JWT_TOKEN>

5. Fetch News

GET /api/news
Headers:

Authorization: Bearer <JWT_TOKEN>


Running the Project

Install dependencies:

npm install


Start the server in dev mode:

npm run dev