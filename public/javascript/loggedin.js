fetch("http://localhost:3000/auth/loggedin", {
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
    } else {
      console.log("request failed");
    }
  })
  .catch((error) => {
    window.location.href = "login";
  });
