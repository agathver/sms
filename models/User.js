const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    body: String,
    googleId: String,
});
mongoose.model('users',userSchema);