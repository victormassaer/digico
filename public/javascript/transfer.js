//const primus = require("primus"); --> gives error
document.querySelector("#btn--transfer").addEventListener("click", () => {
  let username = document.querySelector("#username").value;
  let amount = document.querySelector("#amount").value;
  let reason = document.querySelector("#reason").value;
  let description = document.querySelector("#description").value;

  fetch("http://localhost:3000/api/v1/transfers/transfers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      amount: amount,
      reason: reason,
      description: description,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.status === "succes") {
        console.log("transaction complete");
        primus.write({
          data: json,
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const suggestions = document.querySelector(".username--suggestions");
const username = document.querySelector("#username");

username.addEventListener("keyup", () => {
  if (!username.value) {
    suggestions.innerHTML = "";
    suggestions.style.display = "none";
  } else {
    fetch(`http://localhost:3000/api/v1/users/search?term=${username.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
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
            const userid = localStorage.getItem("id");
            if (user._id !== userid) {
              let item = document.createElement("p");
              item.classList.add("suggestion--user__true");
              item.innerHTML = `<strong>${user.username}</strong>: ${user.firstName} ${user.lastName}`;
              item.setAttribute("data-userId", user._id);
              suggestions.appendChild(item);
            }
          });
          document
            .querySelectorAll(".suggestion--user__true")
            .forEach((user) => {
              user.addEventListener("click", (e) => {
                console.log(e.target.innerHTML);
                username.value = e.target.innerHTML;
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
});
