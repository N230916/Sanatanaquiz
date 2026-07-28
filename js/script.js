const startBtn = document.getElementById("startBtn");
const usernameInput = document.getElementById("username");

startBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter your name!");
        return;
    }

    const response = await fetch("http://localhost:3000/save-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
    });

    const data = await response.json();

    console.log(data);

    localStorage.setItem("username", username);
    localStorage.setItem("userId",data.id);
    window.location.href = "quiz.html";
});