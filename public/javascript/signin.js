document.querySelector("#btnSignin").addEventListener("click", (e) => {
  e.preventDefault();
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  fetch("https://digico-webtech.herokuapp.com/auth/login", {
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
        showMessage("password or username is incorrect", "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

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
