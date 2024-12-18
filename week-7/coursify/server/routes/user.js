const { Router } = require('express');
const userRouter = Router();
const { userMiddleware } = require('../middleware/user');
const jwt = require('jsonwebtoken');
const USER_SECRET = process.env.USER_SECRET;
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { User, Course } = require('../db');
const userSchema = z.object({
    username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username  must not exceed 30 characters" }),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[@#$%&*?!]/, { message: "Password must contain at least one special character" }),
})

// User routes
userRouter.post('/signup', async (req, res) => {
    // logic to sign up user
    try{
        const parsedData = userSchema.safeParse(req.body);
        
        if(!parsedData.success) {
            return res.status(400).json({
                errors: parsedData.error.errors.map((error) => ({
                    field: error.path[0],
                    message: error.message
                }))
            })
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

userRouter.post('/login', async (req, res) => {
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
            id: user._id.toString(),
        })
    } catch(e) {
        res.status(400).json({
            message: "Error while logging in"
        })
    }
});

userRouter.get('/courses', async (req, res) => {
    // logic to list all courses
    const courses = await Course.find();

    res.status(200).json({
        courses: courses,
    })
});

userRouter.post('/courses/:courseId', userMiddleware, async (req, res) => {
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

userRouter.get('/purchasedCourses', userMiddleware, async (req, res) => {
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