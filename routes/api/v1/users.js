const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const authController = require("../../../controllers/auth");
const app = express();

router.get("/leaderboard", usersController.getLeaderboard);

router.get("/user/:id", usersController.getUserById);

module.exports = router;
