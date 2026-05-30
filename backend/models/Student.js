import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: [true, 'Student USN/Roll Number is required'],
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
