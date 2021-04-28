const { get } = require("../../../routes/api/v1/currency");

function addTransfer(req, res){
    res.json({
        "status" : "succes", 
        "message" : "ADDING TRANSFER"
    });
}

function getAllTransfers(req, res){
    res.json({
        "status" : "succes", 
        "message" : "GETTING TRANSFERS"
    });
}

function getTransferById(req, res){
    let id = req.params.id;
    res.json({
        "status" : "succes", 
        "message" : `GETTING TRANSFER with ID ${id}`
    });
}

function getLeaderboard(req, res){
    res.json({
        "status" : "succes", 
        "message" : "GETTING LEADERBOARD"
    });
}

module.exports.addTransfer = addTransfer;
module.exports.getAllTransfers = getAllTransfers;
module.exports.getTransferById = getTransferById;
module.exports.getLeaderboard = getLeaderboard;
