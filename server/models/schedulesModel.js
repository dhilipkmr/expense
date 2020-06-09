import mongoose from 'mongoose';

const Schedules = mongoose.model('Schedules', {
  _id: mongoose.Schema.Types.ObjectId,
  block: {
    type: String,
    required: true,
    trim: true
  },
  floor: {
    type: String,
    required: true,
    trim: true
  },
  meetingRoom: {
    type: String,
    required: true,
    trim: true
  },
  startTime: {
    type: Number,
    required: true,
    trim: true
  },
  endTime: {
    type: Number,
    required: true,
    trim: true
  }
});

export default Schedules;