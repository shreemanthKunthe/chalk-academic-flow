import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

// Import models and middleware
import User from './models/User.js';
import { protect } from './middleware/auth.js';

// Get the current directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express application
const app = express();

// ============ MIDDLEWARE ============

// Enable CORS for Builder.io integration
// This allows the visual editor and frontend to communicate with this backend
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://builder.io',
    '*'  // For development; restrict in production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse incoming JSON request bodies
app.use(express.json());

// ============ DATABASE CONNECTION ============

// Connect to local MongoDB instance
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coexist_auth';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB at ' + MONGODB_URI);
  })
  .catch((err) => {
    console.log('✗ MongoDB connection failed. Ensure MongoDB is running locally at ' + MONGODB_URI);
    console.log('Error details:', err.message);
  });

// ============ AUTHENTICATION ENDPOINTS ============

/**
 * POST /api/auth/register
 * Register a new user with email, password, name, and role
 * Password is hashed using bcrypt before storage
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate that all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user (password is hashed automatically in User model pre-save hook)
    const newUser = new User({
      name,
      email,
      password,
      role: role || 'Student'
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration'
    });
  }
});

/**
 * POST /api/auth/login
 * Authenticate user with email and password
 * Returns JWT token and user profile including role for Builder.io frontend
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user by email in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password using bcrypt comparison
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create JWT token signed with secret key
    const token = user.getJWTToken();

    // Return token and user profile for Builder.io frontend
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role  // Include role so Builder.io can toggle visibility based on user type
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// ============ PROTECTED ROUTE EXAMPLE ============

/**
 * GET /api/user/profile
 * Protected endpoint that requires valid JWT token
 * Returns authenticated user's profile data
 */
app.get('/api/user/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile'
    });
  }
});

// ============ HEALTH CHECK ENDPOINT ============

/**
 * GET /api/health
 * Simple health check endpoint to verify server is running
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

// ============ START SERVER ============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Authentication server running on http://localhost:${PORT}`);
  console.log(`📚 For academic evaluation:`);
  console.log(`   - Register endpoint: POST /api/auth/register`);
  console.log(`   - Login endpoint: POST /api/auth/login`);
  console.log(`   - Profile endpoint: GET /api/user/profile (requires JWT)\n`);
});
