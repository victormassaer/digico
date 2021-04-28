const express = require("express");
const router = express.Router();
const currencyController = require("../../../controllers/api/v1/currency");
const app = express();

router.post("/transfers", currencyController.addTransfer);

router.get("/transfers", currencyController.getAllTransfers);

router.get("/transfers/:id", currencyController.getTransferById);

router.get("/leaderboard", currencyController.getLeaderboard);

module.exports = router;