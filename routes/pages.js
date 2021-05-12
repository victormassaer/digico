const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pages");
const app = express();

router.get("/index", pagesController.index);

router.get("/login", pagesController.login);

router.get("/signup", pagesController.signup);

router.get("/signin", pagesController.signin);

router.get("/transfer", pagesController.transfer);

router.get("/feed", pagesController.feed);

module.exports = router;
