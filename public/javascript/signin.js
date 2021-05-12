document.querySelector("#signin").addEventListener("click", () =>{
    let email = document.querySelector("#email").value;
    let password = document.querySelector("password").value;

    fetch('HIER KOMT VERDERE ROUTE', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
    })
        .then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "succes") {
                console.log("Sign in complete");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});