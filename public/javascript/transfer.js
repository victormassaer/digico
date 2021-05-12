document.querySelector("#btn--transfer").addEventListener("click", ()=>{
    let username = document.querySelector("#username").value;
    let amount = document.querySelector("#amount").value;
    let reason = document.querySelector("#reason").value;
    let description = document.querySelector("#description").value;

    fetch('HIER KOMT VERDERE ROUTE', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "amount": amount, 
            "reason": reason, 
            "description": reason
        }),
    })
        .then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "succes") {
                console.log("transaction complete");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});