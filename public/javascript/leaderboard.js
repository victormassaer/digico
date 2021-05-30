fetch("http://localhost:3000/api/v1/users/leaderboard", {
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
      let i = 0;
      users.forEach((user) => {
        i++;
        let person = document.createElement("LI");
        person.classList.add("person");
        item = `<p class="number">${i}</p><p class="name">${user.firstName} ${user.lastName}</p> - <p class="coins">${user.coins} coins</p>`;
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
