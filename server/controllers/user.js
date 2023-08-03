const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all required fields'
        })
    }
    const user = await User.findOne({ email: email });
    if (user) {
        throw new Error('Email already exists');
    }
    else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? 'Register successfully' : 'Register failed',
        })
    }
})


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter all required fields'
        })
    }
    const response = await User.findOne({ email: email });
    if (response && await response.isCorrectPassword(password)) {
        //Tách password và role ra khỏi object || trả về object
        const { password, role, ...userData } = response.toObject();
        // Tạo token
        const accessToken = generateAccessToken(response._id, role);
        // Tạo refreshToken
        const refreshToken = generateRefreshToken(response._id);
        // Lưu refreshToken vào db 
        await User.findByIdAndUpdate(response.id, { refeshToken: refreshToken }, { new: true });
        // Lưu refreshToken vào cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            message: 'Login successfully',
            // userData
        })
    } else {
        throw new Error('Email or password is incorrect');
    }
})

const profile = asyncHandler(async (req, res) => {
    if (req.user) {
        const decoded = req.user._id;
        const user = await User.findById(decoded);
        if (user) {
            const { refeshToken, ...userData } = user.toObject();
            return res.status(200).json({
                success: true,
                message: 'Get profile successfully',
                userData
            })

        } else {
            throw new Error('User not found');
        }
    } else {
        throw new Error('authorization not found');
    }
})


module.exports = {
    register,
    login,
    profile,
}