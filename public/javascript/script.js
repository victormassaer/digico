// fetch("http://localhost:3000/auth/loggedin", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + localStorage.getItem("token"),
//   },
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((result) => {
//     if (result.status === "succes") {
//     } else {
//       console.log("request failed");
//     }
//   })
//   .catch((error) => {
//     window.location.href = "login";
//   });
const id = localStorage.getItem("id");
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
      coins = result.data.user.coins;
      document.querySelectorAll(".coins--amount").forEach((item) => {
        item.innerHTML = `${coins} coins`;
      });
      return coins;
    } else {
      console.log("request failed");
    }
  })
  .catch((error) => {
    console.log("request failed");
  });
