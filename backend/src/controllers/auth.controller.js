const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")
// const redis = require("../config/cache")


async function signUpController(req, res) {
  const {username , email, password} = req.body;

  const isAlreadyUser = await userModel.findOne({
    $or:[
      {username} ,
      {email}
    ]
  }) 

  if(isAlreadyUser){
    return res.status(400).json({
      message: "User already registerd with this username or email"
    })
  }
  // const hash = await bcyrpt.hash(password, 10)
  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username ,
    email,
    password: hash
  })

  const token = jwt.sign({
    id : user._id,
    username : user.username
  }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })

// res.cookie("token", token)
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
});


return res.status(201).json({
  message: "user signed in successfully",
  user
})
}

async function loginController(req, res) {
  const {username, email, password} = req.body

  const user = await userModel.findOne({
    $or:[
      {username}, 
      {email}
    ]
  })

  if(!user){
    return res.status(400).json({
      message: "unauthorised user...dont have a account"
    })
  }
    const iPasswordValid = await bcrypt.compare(password, user.password)

    if(!iPasswordValid){
    return res.status(400).json({
      message: "unauthorised user...dont have a account"
    })
  }
    const token = jwt.sign({
    id : user._id,
    username : user.username
  }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  })

// res.cookie("token", token)
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
});
    

    return res.status(200).json({
      message: "user loggedin successfully",
      user :{
        username: user.username,
        // password: user.password,
        email: user.email
      }
    })
  }


async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message: "user fetched successfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}  

async function logoutController(req, res) {
  const token = req.cookies.token;

  // res.clearCookie("token")
  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

  // await blacklistModel.create({
  //   token
  // })

  await redis.set(token,Date.now().toString())

  res.status(201).json({
    message: "logout successful"
  })
}

module.exports = {
  signUpController, loginController , getMeController, logoutController
}