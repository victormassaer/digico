let clicked = 0;

document.querySelector(".nav a").addEventListener("click", (e) => {
  let navigation = document.querySelector(".navigation");
  e.preventDefault;

  switch (clicked) {
    case 0:
      navigation.style = "display: block;";
      console.log(clicked + "display block");
      clicked = 1;
      break;

    case 1:
      navigation.style = "display: none;";
      console.log(clicked);
      clicked = 0;
      break;
  }
});

//get current user and set balance
const id = localStorage.getItem("id");
var user;
var coins;
const getUser = () => {
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
      console.log(result);
      if (result.status === "succes") {
        coins = result.data.coins;
        currentUser = result.data;
        document.querySelectorAll(".coins--amount").forEach((item) => {
          item.innerHTML = `${coins} coins`;
          return coins;
        });
      } else {
        console.log("request failed");
        return "error";
      }
    })
    .catch((error) => {
      console.log("request failed");
    });
};

getUser();
