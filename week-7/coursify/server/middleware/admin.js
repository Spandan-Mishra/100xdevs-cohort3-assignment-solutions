const jwt = require('jsonwebtoken');
const adminSecret = process.env.ADMIN_SECRET;

const adminMiddleware = (req, res, next) => {
//  authMiddleware logic here 
};

module.exports = {
    adminMiddleware: adminMiddleware
}