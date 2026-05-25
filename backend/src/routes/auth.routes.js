const express = require("express");
const { signUpController, loginController, getMeController, logoutController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router();

router.post("/signup", signUpController)
router.post("/login", loginController)
router.get("/logout", logoutController)
router.get("/get-me", authMiddleware.authUser, getMeController)

module.exports = router