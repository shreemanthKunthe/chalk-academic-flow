import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ============ USER SCHEMA DEFINITION ============

/**
 * User Schema - Stores user information for authentication
 * Fields:
 *   - name: User's full name
 *   - email: Unique email address for login
 *   - password: Hashed password (never stored in plain text)
 *   - role: User's role determining access levels (Admin, Faculty, Invigilator, Student)
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a user name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false  // Don't return password by default in queries
  },
  role: {
    type: String,
    enum: ['Admin', 'Faculty', 'Invigilator', 'Student'],
    default: 'Student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ============ PRE-SAVE HOOK FOR PASSWORD HASHING ============

/**
 * Hash password before saving to database
 * Only hash if password is new or modified (not on every save)
 * Uses bcrypt with salt rounds of 10 for security
 */
userSchema.pre('save', async function(next) {
  // Only hash password if it's new or has been modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ============ INSTANCE METHODS ============

/**
 * Compare provided password with hashed password in database
 * Used during login to verify user credentials
 * @param {string} enteredPassword - The password provided by user at login
 * @returns {boolean} True if passwords match, false otherwise
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Generate JWT token for authenticated user
 * Token expires in 7 days and contains user ID
 * Used for subsequent API requests after login
 * @returns {string} Signed JWT token
 */
userSchema.methods.getJWTToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

// Create and export User model
const User = mongoose.model('User', userSchema);

export default User;
