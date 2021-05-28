fetch("http://localhost:3000/api/v1/transfers/transfers", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    if (result.status === "succes") {
      const transfers = result["data"];
      transfers.forEach((transfer) => {
        let userId = localStorage.getItem("id");

        if (transfer["senderId"] === userId) {
          var id = transfer["receiverId"];
          var type = "-";
          var image = "./images/devaluation.svg";
        } else {
          var id = transfer["senderId"];
          var type = "+";
          var image = "./images/profit.svg";
        }

        fetch(`http://localhost:3000/api/v1/users/user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            if (result.status === "succes") {
              console.log(result);
              const user = result["data"];
              const transactions = document.querySelector(".transactions");
              let transaction = document.createElement("div");
              transaction.classList.add("transaction");
              item = `
                <img class="transaction--image" src=${image} alt="upload" />
                <p class="user">
                <span class="name">${user["username"]}</span> -
                <span class="subject">${transfer["reason"]}</span>
                </p>
                <p class="description">
                ${transfer["message"]}
                </p>
                <h3 class="amount"> ${type} ${transfer["amount"]}</h3>
                `;
              transaction.innerHTML = item;
              transactions.appendChild(transaction);
            } else {
              console.log("request failed");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    } else {
      console.log("request failed");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
