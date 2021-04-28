function login(req, res){
    res.json({
        "status" : "succes", 
        "message" : "redirecting to login form"
    });
}

function signup(req, res){
    res.json({
        "status" : "succes", 
        "message" : "redirection to signup form"
    });
}

function transfer(req, res){
    res.json({
        "status" : "succes", 
        "message" : "redirecting to transfer form"
    });
}

module.exports.login = login;
module.exports.signup = signup;
module.exports.transfer = transfer;