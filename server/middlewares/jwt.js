const jwt = require('jsonwebtoken');
const generateAccessToken = (uid, role) => {
    return jwt.sign({ id: uid, role: role }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const generateRefreshToken = (uid) => {
    return jwt.sign({ id: uid }, process.env.JWT_SECRET, { expiresIn: '3d' });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}