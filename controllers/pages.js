function login(req, res) {
  res.sendFile("login.html", { root: "public" });
}

function signup(req, res) {
  res.sendFile("signup.html", { root: "public" });
}

function signin(req, res) {
  res.sendFile("signin.html", { root: "public" });
}

function transfer(req, res) {
  res.sendFile("transfer.html", { root: "public" });
}

function feed(req, res) {
  res.sendFile("feed.html", { root: "public" });
}

function leaderboard(req, res) {
  res.sendFile("leaderboard.html", { root: "public" });
}

function history(req, res) {
  res.sendFile("history.html", { root: "public" });
}

module.exports.login = login;
module.exports.signup = signup;
module.exports.signin = signin;
module.exports.transfer = transfer;
module.exports.feed = feed;
module.exports.leaderboard = leaderboard;
module.exports.history = history;
