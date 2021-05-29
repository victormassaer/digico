const primus = require("primus");

document.querySelector("#btn--transfer").addEventListener("click", ()=>{
    let username = document.querySelector("#username").value;
    let amount = document.querySelector("#amount").value;
    let reason = document.querySelector("#reason").value;
    let description = document.querySelector("#description").value;

    fetch('https://digico-webtech.herokuapp.com/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "amount": amount, 
            "reason": reason, 
            "description": description
        }),
    })
        .then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "succes") {
                console.log("transaction complete");

                primus.write({
                    "data" : json
                })
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

