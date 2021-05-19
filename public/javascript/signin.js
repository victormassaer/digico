document.querySelector("#btnSignin").addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

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
    })
    .then((json) => {
      if (json.data.user.user !== false) {
        console.log(json.data.user.user);
        window.location.href = "../feed.html";
      } else {
        console.error("Error:", json.data.user.error.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
