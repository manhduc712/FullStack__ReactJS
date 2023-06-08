const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const register =  asyncHandler(async(req, res) => {
    const {firstname, lastname, email, password} = req.body;
    if(!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all required fields'
        })
    }
    const response = await User.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        response
    })
})

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all required fields'
        })
    }
})
module.exports = {
    register
}