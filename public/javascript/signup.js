document.querySelector("#btnLogin").addEventListener("click", () => {
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    fetch('http://localhost:3000/frontend/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "email": email,
            "password": password
        }),
    })
        .then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "succes") {
                console.log("Sign up complete");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.querySelector("#email").addEventListener("keypress", ()=>{
    let val = document.querySelector('#email').value;
    console.log(val);

    if(!val.includes("@student.thomasmore.be")){
        console.log('email moet @student.thomasmore.be bevatten');
    }else{
        console.log("email goedgekeurd");
    }
});