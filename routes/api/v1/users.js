const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const app = express();

router.post("/users", usersController.createUser);

router.get("/leaderboard", usersController.getLeaderboard);

module.exports = router;
