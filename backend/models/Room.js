import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  room: {
    type: String,
    required: [true, 'Room/Hall name is required'],
    unique: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: [true, 'Room seating capacity is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
