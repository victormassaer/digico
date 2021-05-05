const Transfer = require("../../../models/Transfer");
const { get } = require("../../../routes/api/v1/transfers");

function addTransfer(req, res) {
  let transfer = new Transfer();
  transfer.name = req.body.name;
  transfer.save((err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Couldnot save add this transfer",
      });
    }
    if (!err) {
      res.json({
        status: "succes",
        message: "ADDING TRANSFER",
        data: { message: doc },
      });
    }
  });
}

function getAllTransfers(req, res) {
  Transfer.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: "Couldnot get transfers",
      });
    }
    if (!err) {
      res.json({
        status: "succes",
        message: "GETTING TRANSFER",
        data: { message: doc },
      });
    }
  });
}

function getTransferById(req, res) {
  let transferId = req.params.id;
  Transfer.findOne({ _id: transferId }, (err, doc) => {
    if (err) {
      res.json({
        status: "error",
        message: `Couldnot find a transfer with id: ${userId}`,
      });
    }
    if (!err) {
      res.json({
        status: "success",
        message: `GETTING TRANSFER with ID ${transferId}`,
        data: {
          message: doc,
        },
      });
    }
  });
}

module.exports.addTransfer = addTransfer;
module.exports.getAllTransfers = getAllTransfers;
module.exports.getTransferById = getTransferById;
