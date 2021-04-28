const express = require("express");
const router = express.Router();
const frontendController = require("../controllers/frontend");
const app = express();

router.get("/login", frontendController.login);

router.get("/signup", frontendController.signup);

router.get("/transfer", frontendController.transfer);

module.exports = router;