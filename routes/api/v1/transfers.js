const express = require("express");
const router = express.Router();
const transfersController = require("../../../controllers/api/v1/transfers");
const app = express();

router.post("/transfers", transfersController.addTransfer);

router.get("/transfers", transfersController.getAllTransfers);

router.get("/transfers/:id", transfersController.getTransferById);

module.exports = router;
