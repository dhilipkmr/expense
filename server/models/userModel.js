import mongoose from 'mongoose';
import expenseSchema from './expenseModel';

export const usersModel = mongoose.model('Users', {
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    emailId: {
        type: String,
        required: false,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    expense: [expenseSchema]
});
