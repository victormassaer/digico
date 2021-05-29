fetch("https://digico-webtech.herokuapp.com/api/v1/users/leaderboard", {
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
      const list = document.querySelector(".list");

      users = result.data.users;
      users.forEach((user) => {
        let person = document.createElement("LI");
        person.classList.add("person");
        item = `<p><span class="name">${user.firstName} ${user.lastName}</span> - <span class="coins">${user.coins} coins</span></p>`;
        person.innerHTML = item;
        list.appendChild(person);
      });
    } else {
      console.log("request failed");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
