const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      mesage: "token not found"
    })
  }

  const isTokenBlacklisted = await redis.get(token);

if(isTokenBlacklisted){
  return res.status(401).json({
    message: "unauthorised user"
  })
}

  let decoded = null
try{
   decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  )
  req.user = decoded
  next()
}catch(err){
  return res.status(401).json({
      mesage: "Invalid token"
    })
}


}

module.exports = {
  authUser
}