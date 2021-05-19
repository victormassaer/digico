let clicked = 0;

document.querySelector(".nav a").addEventListener("click", (e)=>{
    let navigation = document.querySelector(".navigation");
    e.preventDefault;

    switch(clicked){
        case 0:
            navigation.style = "display: block;"
            console.log(clicked + "display block")
            clicked = 1;
        break;

        case 1: 
            navigation.style = "display: none;"
            console.log(clicked)
            clicked = 0;
        break
    }
    
});