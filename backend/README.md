# Coexist Authentication Backend

A clean, locally-hosted authentication backend for Builder.io integration using Node.js, Express, MongoDB, and JWT.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Ensure MongoDB is Running Locally
```bash
# On macOS (using Homebrew):
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
# Start MongoDB from Services or use: mongod
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/coexist_auth
JWT_SECRET=your-secure-random-key
PORT=5000
```

### 4. Start the Server
```bash
# Development mode with auto-reload:
npm run dev

# Production mode:
npm start
```

Server will be available at `http://localhost:5000`

## API Endpoints

### Register a New User
**POST** `/api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "Student"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student"
  }
}
```

### Login User
**POST** `/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student"
  }
}
```

### Get User Profile (Protected)
**GET** `/api/user/profile`

Headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "Student"
  }
}
```

### Health Check
**GET** `/api/health`

Response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

## Architecture Overview

### Models (models/User.js)
- **User Schema**: Stores user information with role-based access control
- **Password Hashing**: Automatic bcrypt hashing on save
- **JWT Generation**: Secure token generation for stateless authentication

### Middleware (middleware/auth.js)
- **protect**: Verifies JWT token and authenticates requests
- **authorize**: Role-based access control (optional)

### Server (server.js)
- Express HTTP server with CORS enabled for Builder.io integration
- RESTful API endpoints for authentication
- MongoDB connection with error handling
- Clean, commented code for academic evaluation

## Features

✅ Local MongoDB database (no external services required)
✅ Bcrypt password hashing with salt rounds
✅ JWT token-based authentication
✅ Role-based access control (Admin, Faculty, Invigilator, Student)
✅ CORS enabled for Builder.io visual editor
✅ Comprehensive error handling
✅ Fully commented code for educational purposes
✅ ES Modules (modern JavaScript)

## For Academic Evaluators

All code includes detailed comments explaining:
- What each function does
- How authentication flows work
- Why certain security practices are implemented
- How the system integrates with Builder.io frontend

The system is intentionally kept simple and readable while following security best practices.
