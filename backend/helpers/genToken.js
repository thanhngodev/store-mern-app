const jwt = require("jsonwebtoken");

async function genToken(userData) {
    const tokenData = {
        _id: userData._id,
        email: userData.email,
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60*60*8 } );
    const tokenOption = {
        httpOnly: true,
        secure: true
    }

    return { token, tokenOption }
}

module.exports = genToken;