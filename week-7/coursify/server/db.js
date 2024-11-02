const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

// Define mongoose schemas
const userSchema = new Schema({
  // userSchema here
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: {
    type: [ObjectId],
    default: [],
  }
});

const adminSchema = new Schema({
// adminSchema here
    username: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
});

const courseSchema = new Schema({
// courseSchema here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: {
        type: Boolean,
        default: true,
    },
    creatorId: ObjectId,
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
    mongoose,
    User,
    Admin,
    Course,
}