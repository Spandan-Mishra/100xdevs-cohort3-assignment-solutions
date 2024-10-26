const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define mongoose schemas
const userSchema = new Schema({
  // userSchema here
});

const adminSchema = new Schema({
// adminSchema here
});

const courseSchema = new Schema({
// courseSchema here
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

