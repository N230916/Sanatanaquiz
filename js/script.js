const startBtn = document.getElementById("startBtn");
const usernameInput = document.getElementById("username");

startBtn.addEventListener("click", async () => {
    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter your name!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/save-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();
        console.log(data);

        // Save user details
        localStorage.setItem("username", username);
        localStorage.setItem("userId", data.id);

        // Go to quiz page
        window.location.href = "quiz.html";

    } catch (err) {
        console.error(err);
        alert("Unable to connect to the server.");
    }
});