import mongoose from 'mongoose';
import Users from './userModel';

const Expenses = mongoose.model('Expenses', {
  token: {
    type: String,
    ref: 'Users'
  },
  amount: {
      type: Number,
      required: true,
      trim: true
  },
  category: {
      type: String,
      required: true,
      trim: true,
      default: 'others'
  },
  type: {
    type: String,
    required: false,
    trim: true,
    default: 'expense'
  },
  date: {
    type: Date,
    required: false,
    trim: true,
    default: Date.now()
  },
  dd: {
    type: Number,
    required: false,
    trim: true
  },
  ww: {
    type: Number,
    required: false,
    trim: true
  },
  dow: {
    type: Number,
    required: false,
    trim: true
  },
  mm: {
    type: Number,
    required: false,
    trim: true
  },
  yy: {
    type: Number,
    required: false,
    trim: true
  }
});
export default Expenses;