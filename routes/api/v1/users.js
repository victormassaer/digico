const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const authController = require("../../../controllers/auth");
const app = express();

router.post("/signup", authController.signup);

router.get("/leaderboard", usersController.getLeaderboard);

module.exports = router;
