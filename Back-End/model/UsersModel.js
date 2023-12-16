const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username :{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
        require:false
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course' 
    }],
    cards: [{
        nameOnCard: {
            type: String,
            required: true
        },
        cardNumber: {
            type: String,
            required: true
        },
        expiryDate: {
            type: String,
            required: true
        },
        cvc: {
            type: String,
            required: true
        },
        cardType: {
            type: String, 
            required: true
        }
    }],
    payments: [String]

})

userSchema.pre('save', async function (next) {
    console.log('Pre-save middleware triggered.');
    console.log('this.password:', this.password);
    
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '10h' }
    );
    return token;
};
const user = mongoose.model('User', userSchema );
module.exports = user;