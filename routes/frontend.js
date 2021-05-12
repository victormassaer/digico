const express = require("express");
const router = express.Router();
const frontendController = require("../controllers/frontend");
const app = express();

router.get("/index", frontendController.index);

router.get("/login", frontendController.login);

router.get("/signup", frontendController.signup);

router.get("/signin", frontendController.signin);

router.get("/transfer", frontendController.transfer);

router.get("/feed", frontendController.feed);

module.exports = router;
