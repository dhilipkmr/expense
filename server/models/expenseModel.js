import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: {
      type: String,
      required: true,
      trim: true
  },
  category: {
      type: String,
      required: true,
      minlength: 8,
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
export default expenseSchema;