import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  day: {
    type: Number,
    required: true
  },
  slot: {
    type: Number,
    required: true
  },
  hall: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
