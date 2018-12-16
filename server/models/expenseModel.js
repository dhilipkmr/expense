import mongoose from 'mongoose';
import Users from './userModel';

const Expenses = mongoose.model('Expenses', {
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  amount: {
      type: String,
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
    type: String,
    required: false,
    trim: true,
    default: Date.now()
  }
});
export default Expenses;