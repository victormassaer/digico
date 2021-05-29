//const primus = require("primus"); --> gives error
const userid = localStorage.getItem("id");
var receiverid;
const suggestions = document.querySelector(".username--suggestions");
const username = document.querySelector("#username");

//SEND TRANSFER!!
document.querySelector("#btn--transfer").addEventListener("click", (e) => {
  try {
    let usernameValue = username.value;
    let amount = document.querySelector("#amount").value;
    let reason = document.querySelector("#reason").value;
    let description = document.querySelector("#description").value;

    const validation = validateInput(usernameValue, amount);

    if (validation !== true) {
      showMessage(validation, "error");
    } else {
      fetch(
        `https://digico-webtech.herokuapp.com/api/v1/users/username/${usernameValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(!json.data);
          if (!json.data) {
            showMessage("Fill in a valid username", "error");
          } else {
            receiverid = json.data._id;
            fetch(
              "https://digico-webtech.herokuapp.com/api/v1/transfers/transfers",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  senderId: userid,
                  receiverId: receiverid,
                  amount: amount,
                  reason: reason,
                  description: description,
                }),
              }
            )
              .then((response) => {
                return response.json();
              })
              .then((json) => {
                if (json.status === "succes") {
                  console.log("transaction complete");
                  document
                    .querySelectorAll(".coins--amount")
                    .forEach((item) => {
                      item.innerHTML = `${coins - amount} coins`;
                      showMessage(
                        `Successfully sent ${amount}  coins to ${usernameValue}`,
                        "success"
                      );
                    });
                  // primus.write({
                  //   data: json,
                  // });
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  } catch (err) {
    console.error(err);
  }
});

// SUGGESTIONS!
username.addEventListener("keyup", () => {
  try {
    if (!username.value) {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
    } else {
      fetch(
        `https://digico-webtech.herokuapp.com/api/v1/users/search?term=${username.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json);
          const users = json.data;
          suggestions.style.display = "block";
          suggestions.innerHTML = "";
          if (users.length > 0) {
            users.forEach((user) => {
              if (user._id !== userid) {
                let item = document.createElement("p");
                item.classList.add("suggestion--user__true");
                item.innerHTML = `<strong>${user.username}</strong>: ${user.firstName} ${user.lastName}`;
                item.setAttribute("data-username", user.username);
                suggestions.appendChild(item);
              }
            });
            document
              .querySelectorAll(".suggestion--user__true")
              .forEach((user) => {
                user.addEventListener("click", (e) => {
                  console.log(e.target.innerHTML);
                  username.value = user.getAttribute("data-username");
                  suggestions.innerHTML = "";
                  suggestions.style.display = "hidden";
                });
              });
          } else {
            let item = document.createElement("p");
            item.classList.add("suggestion--user__false");
            item.innerHTML = `No results found for <strong>${username.value}</strong>`;
            suggestions.appendChild(item);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  } catch (err) {
    console.err(err);
  }
});

const validateInput = (username, amount) => {
  if (!username) {
    return "Username may not be empty";
  } else if (username === currentUser.username) {
    return "You cant send coins to yourself";
  } else if (!amount || isNaN(amount)) {
    return "Fill in a valid amount of coins";
  } else if (coins < amount) {
    return "You do not have enough coins";
  } else {
    return true;
  }
};

const showMessage = (message, error) => {
  document.querySelector(".messagebox").style.display = "block";
  console.log(error);
  if (error == "error") {
    document.querySelector(".messagebox").style.backgroundColor =
      "rgb(209, 101, 101)";
  } else {
    document.querySelector(".messagebox").style.backgroundColor =
      "rgb(39, 185, 68)";
  }
  document.querySelector(".messagebox-message").innerHTML = message;
};
