const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pages");
const app = express();

router.get("/", pagesController.feed);

router.get("/login", pagesController.login);

router.get("/signup", pagesController.signup);

router.get("/signin", pagesController.signin);

router.get("/transfer", pagesController.transfer);

router.get("/feed", pagesController.feed);

router.get("/leaderboard", pagesController.leaderboard);

router.get("/history", pagesController.history);

module.exports = router;
