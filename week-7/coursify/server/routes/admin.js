const { Router } = require('express');
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const bcrypt = require('bcrypt');
const { z } = require('zod');
const adminMiddleware = require('../middleware/admin')
const { Admin, Course } = require('../db');
const adminSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8).max(16)
})

// Admin routes
adminRouter.post('/admin/signup', async (req, res) => {
    // logic to sign up admin
    try{
        const parsedData = adminSchema.safeParse(req.body);
        if(!parsedData.success) {
            res.status(400).json({ message: parsedData.error });
        }

        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password);

        await Admin.create({
            username: username, 
            password: hashedPassword,
        })

        res.status(200).json({
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

        const parsedData = adminSchema.safeParse(req.body);
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

adminRouter.post('/admin/courses', adminMiddleware, async (req, res) => {
    // logic to create a course
    const { title, description, price, imageLink, published } = req.body;

    const creatorId = req.id;

    const course = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: published,
        creatorId: creatorId,
    })

    res.status(200).json({
        message: "Course created successfully",
        courseId: course._id.toString(),
    })

});

adminRouter.put('/admin/courses/:courseId', adminMiddleware,  async (req, res) => {
    // logic to edit a course
    const courseId = req.params.courseId;
    const adminId = req.id;
    const { title, description, price, imageLink, published } = req.body;

    try {
        const course = await Course.updateOne({
            _id: courseId,
            creatorId: adminId,
        }, {
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
            published: published,
        })

        res.status(200).json({
            message: "Course updated successfully",
        })
    } catch(e) {
        res.status(400).json({
            message:"Error while updating course"
        })
    }

});

adminRouter.get('/admin/courses', async (req, res) => {
    // logic to get all courses
    const courses = await Course.find();

    res.status(200).json({
        courses: courses,
    })
});

module.exports = { 
    adminRouter: adminRouter
 };