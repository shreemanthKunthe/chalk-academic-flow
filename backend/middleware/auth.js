import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ============ PROTECT MIDDLEWARE ============

/**
 * Authentication middleware that verifies JWT token and protects routes
 * 
 * How it works:
 *   1. Extracts JWT token from Authorization header (format: "Bearer <token>")
 *   2. Verifies token signature and expiration
 *   3. Extracts user ID from token payload
 *   4. Fetches user from database
 *   5. Attaches user object to request.user for downstream handlers
 * 
 * Usage: app.get('/protected-route', protect, (req, res) => {...})
 * After middleware runs, req.user contains the authenticated user's data
 */
export const protect = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    // Expected format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists in request
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided. Please log in first.'
      });
    }

    // Verify token signature and expiration
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    );

    // Fetch user from database using ID from token
    const user = await User.findById(decoded.id);

    // Check if user still exists (account might have been deleted)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token may be invalid.'
      });
    }

    // Attach authenticated user to request object
    // This makes user data available to downstream route handlers
    req.user = user;
    next();

  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    // Handle any other errors
    res.status(500).json({
      success: false,
      message: 'Authentication error occurred'
    });
  }
};

// ============ ROLE-BASED ACCESS CONTROL (OPTIONAL) ============

/**
 * Factory function to create role-based middleware
 * Restricts access to specified roles only
 * 
 * Usage: app.get('/admin-route', protect, authorize('Admin'), handler)
 * 
 * @param {...string} allowedRoles - Role names that are allowed access
 * @returns {function} Middleware function
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user's role is in the allowed list
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Only ${allowedRoles.join(' and ')} can access this resource`
      });
    }
    next();
  };
};
