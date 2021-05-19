document.querySelector("#btnSignin").addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

<<<<<<< HEAD
  fetch("http://localhost:3001/api/v1/users/login", {
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
=======
    fetch('http://localhost:3000/frontend/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
>>>>>>> fe75df2d20cf365d8d7e67cd8c6ece61597f0793
    })
    .then((json) => {
      if (json.status === "succes") {
        let token = json.data.token;
        localStorage.setItem("token", token);
        window.location.href = "../feed.html";
      } else {
        console.log("login failed");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
