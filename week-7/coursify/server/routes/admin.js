const { Router } = require('express');
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { Admin, Course } = require('../db');
const adminSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(16)
})

// Admin routes
adminRouter.post('/admin/signup', async (req, res) => {
    // logic to sign up admin
    try{
        const parsedData = userSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({ message: parsedData.error });
        }

        const { username, passwrod } = req.body;

        const hashedPassword = await bcrypt.hash(password);

        await Admin.create({
            username: username, 
            password: hashedPassword,
        })

        res.json({
            message: "Admin created successfully"
        })

    } catch(e) {
        res.status(400).json({
            message: "Error while signing in"
        });
    }
});

adminRouter.post('/admin/login', async (req, res) => {
    // logic to log in admin
    try{

        const parsedData = userSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({ message: parsedData.error });
        }

        const { username, password } = req.body;

        const admin = await Admin.findOne({
            username: username,
        })

        if(!admin) {
            res.status(400).json({
                message: "Admin not found"
            });
            return ;
        }

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if(!isPasswordCorrect) {
            res.status(400).json({
                message: "Invalid password"
            });
            return ;
        }

        const token = jwt.sign({
            id: admin._id.toString(),
        }, ADMIN_SECRET);

        res.json({
            message: "Logged in successfully",
            token: token,
        })

    } catch(e) {
        res.status(400).json({
            message: "Error while logging in"
        });
    }  
});

adminRouter.post('/admin/courses', (req, res) => {
    // logic to create a course
});

adminRouter.put('/admin/courses/:courseId', (req, res) => {
    // logic to edit a course
});

adminRouter.get('/admin/courses', (req, res) => {
    // logic to get all courses
});

module.exports = { 
    adminRouter: adminRouter
 };