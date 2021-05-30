primus = Primus.connect("/feed", {
    reconnect: {
      max: Infinity,
      min: 500,
      retries: 10,
    },
  });
  
  primus.on("data", (data) => {
      if(data.receiverId === localStorage.getItem("id")){
        createItem(data)
        console.log(data);
        console.log("data ontvangen");
      }
  });
  
  const createItem = (json)=>{
    const transactions = document.querySelector(".transactions");
    let transaction = document.createElement("div");
    transaction.classList.add("transaction");
    item = `
      <img class="transaction--image" src='./images/profit.svg' alt="upload" />
      <p class="user">
      <span class="name">${json.username}</span> -
      <span class="subject">${json.reason}</span>
      </p>
      <p class="description">
      ${json.description}
      </p>
      <h3 class="amount"> + ${json.coins}</h3>
      `;
    transaction.innerHTML = item;
    transactions.prepend(transaction);
  }
  