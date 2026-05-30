import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Faculty name is required'],
    unique: true,
    trim: true
  },
  available: {
    type: String,
    required: [true, 'Faculty available days description is required'],
    trim: true
  },
  availabilityGrid: {
    type: [[String]], // 3x5 grid of statuses: "available" | "preferred-leave" | "blocked"
    default: [
      ["available", "available", "available", "available", "available"],
      ["available", "available", "available", "available", "available"],
      ["available", "available", "available", "available", "available"]
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Faculty = mongoose.model('Faculty', facultySchema);

export default Faculty;
