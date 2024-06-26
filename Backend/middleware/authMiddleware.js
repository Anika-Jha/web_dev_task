const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Model/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_KEY)
            req.user = await User.findById(decode.id).select("-password")
            next();
        } catch (error) {

            res.status(401)
            throw new Error("Not authorised , token failed")
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not authorised , token failed")
    }

})


module.exports = protect 