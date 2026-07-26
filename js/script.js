const button =document.getElementById("startBtn");
const input =document.getElementById("username");
const message =document.getElementById("message");
button.addEventListener("click",function (){
    const name =input.value;
    if(name === ""){
        message.textContent="please enter your name.";
    }else{
        localStorage.setItem("username", name);
        window.location.href = "quiz.html";  }

});
