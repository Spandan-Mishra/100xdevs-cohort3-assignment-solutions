const jwt = require('jsonwebtoken');
const userSecret = process.env.USER_SECRET;

const userMiddleware = (req, res, next) => {
    //  authMiddleware logic here 
   try{
        const token = req.headers("Authorization");

        if(!token) {
            res.status(401).json({
                message: "Unauthorized access"
            })
        }

        const decoded = jwt.verify(token, userSecret);
        if(decoded && decoded.id) {
            req.id = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "You are not signed in"
            })
        }
    } catch(e) {
        res.status(400).json({
            message: "Error while logging in"
        })
    } 
};

module.exports = {
    userMiddleware: userMiddleware
}