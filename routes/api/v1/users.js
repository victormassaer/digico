const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const authController = require("../../../controllers/auth");
const app = express();

router.get("/leaderboard", usersController.getLeaderboard);

router.get("/user/:id", usersController.getUserById);

router.get("/username/:username", usersController.getUserByUsername);

router.get("/search", usersController.autocomplete);

module.exports = router;
