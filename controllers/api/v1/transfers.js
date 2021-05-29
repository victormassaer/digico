const Transfer = require("../../../models/Transfer");
const User = require("../../../models/User");
const { get } = require("../../../routes/api/v1/transfers");

const addTransfer = (req, res) => {
  try {
    let transfer = new Transfer();
    transfer.senderId = req.body.senderId;
    transfer.receiverId = req.body.receiverId;
    transfer.reason = req.body.reason;
    transfer.message = req.body.description;
    transfer.amount = req.body.amount;
    transfer.created = Date.now();
    transfer.save((err, doc) => {
      if (err) {
        res.json({
          status: "error",
          message: "Couldnot save this transfer",
        });
      }
      if (!err) {
        User.findById(req.body.senderId).exec((err, sender) => {
          if (err) {
            res.json({
              status: "error",
              message: "Couldnot save this transfer",
            });
          }
          if (!err) {
            sender.coins = sender.coins - req.body.amount;
            sender.save((err, result) => {
              if (err) {
                res.json({
                  status: "error",
                  message: "Couldnot save this transfer",
                });
              }
            });
          }
        });

        User.findById(req.body.receiverId).exec((err, receiver) => {
          if (err) {
            res.json({
              status: "error",
              message: "Couldnot save add this transfer",
            });
          }
          if (!err) {
            receiver.coins = receiver.coins + parseInt(req.body.amount);
            receiver.save((err, result) => {
              if (err) {
                res.json({
                  status: "error",
                  message: "Couldnot save add this transfer",
                });
              }
            });
          }
        });
        res.json({
          status: "succes",
          message: "ADDING TRANSFER",
          data: { message: doc },
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "error",
      message: "Couldnot save add this transfer",
    });
  }
};

const getAllTransfers = (req, res) => {
  Transfer.find({})
    .sort({ created: "desc" })
    .exec((err, doc) => {
      if (err) {
        res.json({
          status: "error",
          message: "Couldnot get transfers",
        });
      }
      if (!err) {
        res.json({
          status: "succes",
          message: "got all transfers",
          data: doc,
        });
      }
    });
};

const getTransferById = (req, res) => {
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
};

module.exports.addTransfer = addTransfer;
module.exports.getAllTransfers = getAllTransfers;
module.exports.getTransferById = getTransferById;
