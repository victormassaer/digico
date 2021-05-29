primus = Primus.connect("https://digico-webtech.herokuapp.com/feed.html", {
  reconnect: {
    max: Infinity,
    min: 500,
    retries: 10,
  },
});
