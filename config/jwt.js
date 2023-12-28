const jwt = require('jsonwebtoken');

const generateJwtToken=(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
}

module.exports={generateJwtToken}

// jwt token create by
// first-- node
// second-- require('crypto').randomBytes(32).toString('hex')