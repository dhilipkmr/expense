import mongoose from 'mongoose';
import Expenses from './expenseModel';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
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
    token: {
        type: String,
        required: false
    },
    expense: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Expenses'
        }
    ]
});

function generateToken(userDoc, next) {
    bcrypt.genSalt(10, function(err, salt){
        if (err) {
            console.log('Unable to generate Salt for Token', err);
        } else {
            bcrypt.hash(userDoc._id.toHexString() + userDoc.password.toString(), salt, function(err, hash) {
                if (err) {
                    console.log('Unable to generate Hash for Token', err);
                } else {
                    userDoc.token = hash;
                    next();
                }
            });
        }
    });
}

// Specific to all entries in document, 'this' refers to a document
UserSchema.pre('save', function(next) {
    var userDoc = this;
    if (userDoc.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt){
            if (err) {
                console.log('Unable to generate Salt', err);
            } else {
                bcrypt.hash(userDoc.password, salt, function(err, hash) {
                    if (err) {
                        console.log('Unable to generate Hash', err);
                    } else {
                        userDoc.password = hash;
                        generateToken(userDoc, next);
                    }
                });
            }
        });
    } else {
        generateToken(userDoc, next);
    }
});

const Users = mongoose.model('Users', UserSchema);
export default Users;