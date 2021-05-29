document.querySelector("#btnSignin").addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  fetch("https://digico-webtech.herokuapp.com/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.status === "succes") {
        let token = json.data.token;
        localStorage.setItem("token", token);
        let id = json.data.id;
        localStorage.setItem("id", id);
        window.location.href = "../feed.html";
      } else {
        console.log("login failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
