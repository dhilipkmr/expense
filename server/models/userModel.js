import mongoose from 'mongoose';
import Expenses from './expenseModel';

const Users = mongoose.model('Users', {
    _id: mongoose.Schema.Types.ObjectId,
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
    expense: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Expenses'
        }
    ]
});
export default Users;