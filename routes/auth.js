const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const app = express();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/loggedin", authController.loggedIn);

module.exports = router;
