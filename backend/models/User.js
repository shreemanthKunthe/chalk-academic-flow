import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// ============ USER SCHEMA DEFINITION ============

/**
 * User Schema - Stores user session profiles for authentication
 * Fields:
 *   - name: User's name
 *   - email: Email address (unique, sparse to allow students without emails)
 *   - role: User's role (Admin, Faculty, Invigilator, Student)
 *   - usn: Student's Roll Number (unique, sparse, uppercase)
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    sparse: true, // Allows multiple users without emails (e.g., student-only sign-ins)
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['Admin', 'Faculty', 'Invigilator', 'Student'],
    required: [true, 'Please specify a user role']
  },
  usn: {
    type: String,
    sparse: true, // Allows non-students (Admins, Faculty) to not have a USN
    uppercase: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ============ INSTANCE METHODS ============

/**
 * Generate JWT token for authenticated user sessions
 * Token contains both the user ID and role for downstream access control
 */
userSchema.methods.getJWTToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    { expiresIn: '7d' }
  );
};

// Create and export User model
const User = mongoose.model('User', userSchema);

export default User;
