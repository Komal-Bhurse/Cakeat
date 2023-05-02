const express = require("express");
const {restrictToLogedInUserOnly} = require("../middlewares/auth")

const {handleSignIn,handleSignUp,handleLogout} = require("../controllers/user");

const router = express.Router();

router.post("/register",handleSignUp)

router.post("/login",handleSignIn)

router.post("/logout",restrictToLogedInUserOnly,handleLogout)

module.exports = router;