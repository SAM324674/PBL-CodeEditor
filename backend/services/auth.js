const JWT=require('jsonwebtoken');
require('dotenv').config()
const jwtSecret=process.env.JWT_secret_key;

function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
    
    };
    const token=JWT.sign(payload,jwtSecret);
    return token;
}

function validateToken(token){
    const payload=JWT.verify(token,jwtSecret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken,
};
