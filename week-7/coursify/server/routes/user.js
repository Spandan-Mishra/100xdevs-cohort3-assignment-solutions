const { Router } = require('express');
const admin = require('./admin');
const userRouter = Router();

// User routes
userRouter.post('/users/signup', (req, res) => {
    // logic to sign up user
});

userRouter.post('/users/login', (req, res) => {
    // logic to log in user
});

userRouter.get('/users/courses', (req, res) => {
    // logic to list all courses
});

userRouter.post('/users/courses/:courseId', (req, res) => {
    // logic to purchase a course
});

userRouter.get('/users/purchasedCourses', (req, res) => {
    // logic to view purchased courses
});

module.exports = { 
    userRouter: userRouter
 };