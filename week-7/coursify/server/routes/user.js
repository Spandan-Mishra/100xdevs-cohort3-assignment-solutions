const { Router } = require('express');
const userRouter = Router();
const userMiddleware = require('../middleware/user');
const jwt = require('jsonwebtoken');
const USER_SECRET = process.env.USER_SECRET;
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { User, Course } = require('../db');
const userSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(16)
})

// User routes
userRouter.post('/users/signup', async (req, res) => {
    // logic to sign up user
    try{
        const parsedData = userSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({ message: parsedData.error });
        }

        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password);

        await User.create({
            username: username,
            password: hashedPassword,
        })

        res.status(200).json({
            message: "User created successfully"
        })
    } catch(e) {
        res.status(400).json({
            message: "Error while signing in"
        });
    }
});

userRouter.post('/users/login', async (req, res) => {
    // logic to log in user
    try {
        const parsedData = userSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({ message: parsedData.error });
        }

        const { username, password } = req.body;

        const user = await User.findOne({
            username: username,
        })

        if(!user) {
            res.status(400).json({
                message: "User not found"
            })
            return ;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            res.status(400).json({
                message: "Invalid password"
            })
            return ;
        }

        const token = jwt.sign({
            id: user._id.toString(),
        }, USER_SECRET);

        res.json({
            message: "User logged in successfully",
            token: token,
        })
    } catch(e) {
        res.status(400).json({
            message: "Error while logging in"
        })
    }
});

userRouter.get('/users/courses', async (req, res) => {
    // logic to list all courses
    const courses = await Course.find();

    res.status(200).json({
        course: courses,
    })
});

userRouter.post('/users/courses/:courseId', userMiddleware, async (req, res) => {
    // logic to purchase a course
    const courseId = req.params.courseId;
    const userId = req.id;

    try{
        await User.findByIdAndUpdate(
            userId,
            { $push: { courses: courseId } },
            { new: true }
        );

        res.status(200).json({
            message: "Course purchased successfully"
        })
    } catch(e) {
        res.status(400).json({
            message: "Error while purchasing course"
        })
    }
});

userRouter.get('/users/purchasedCourses', userMiddleware, async (req, res) => {
    // logic to view purchased courses
    const userId = req.id;
    try{
        const user = User.findOne({
            _id: userId,
        })

        const purchasedCourses = await Course.find({
            _id: { $in: user.courses },
        })

        res.status(200).json({
            "purchasedCourses": purchasedCourses,
        })
    } catch(e) {
        res.status(400).json({
            message: "Error while fetching purchased courses"
        })
    }


});

module.exports = { 
    userRouter: userRouter
 };