const jwt = require('jsonwebtoken');
const userSecret = process.env.USER_SECRET;

const userMiddleware = (req, res, next) => {
//  authMiddleware logic here 
};

module.exports = {
    userMiddleware: userMiddleware
}