import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true, // "dutyId-seatIndex"
    index: true
  },
  status: {
    type: String,
    enum: ['PRESENT', 'ABSENT', 'NOT_MARKED'],
    default: 'NOT_MARKED'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
