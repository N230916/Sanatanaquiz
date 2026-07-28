// ============================
// QUESTIONS
// ============================

const questions = [
{
    question: "Who delivered the Bhagavad Gita to Arjuna?",
    options: ["Vyasa", "Lord Krishna", "Narada", "Valmiki"],
    answer: "Lord Krishna"
},
{
    question: "Who wrote the Ramayana?",
    options: ["Kalidasa", "Valmiki", "Ved Vyasa", "Tulsidas"],
    answer: "Valmiki"
},
{
    question: "Who compiled the Vedas?",
    options: ["Narada", "Agastya", "Ved Vyasa", "Vashistha"],
    answer: "Ved Vyasa"
},
{
    question: "Who carried the Sanjeevani mountain?",
    options: ["Garuda", "Hanuman", "Sugriva", "Jambavan"],
    answer: "Hanuman"
},
{
    question: "Which river descended from Lord Shiva's locks?",
    options: ["Yamuna", "Godavari", "Ganga", "Kaveri"],
    answer: "Ganga"
},
{
    question: "Which epic contains the Bhagavad Gita?",
    options: ["Ramayana", "Mahabharata", "Skanda Purana", "Rig Veda"],
    answer: "Mahabharata"
},
{
    question: "Who was Lord Rama's mother?",
    options: ["Kaikeyi", "Sumitra", "Kaushalya", "Sita"],
    answer: "Kaushalya"
},
{
    question: "Which bird sacrificed his life while saving Sita?",
    options: ["Garuda", "Jatayu", "Peacock", "Swan"],
    answer: "Jatayu"
},
{
    question: "Who was the guru of both the Pandavas and Kauravas?",
    options: ["Kripacharya", "Dronacharya", "Parashurama", "Vashistha"],
    answer: "Dronacharya"
},
{
    question: "Who lifted the Govardhan Hill?",
    options: ["Arjuna", "Lord Krishna", "Hanuman", "Indra"],
    answer: "Lord Krishna"
}];

// ============================
// VARIABLES
// ============================

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timer;

const username = localStorage.getItem("username");

// ============================
// HTML ELEMENTS
// ============================

const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const result = document.getElementById("result");

const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const progressBar = document.getElementById("progressBar");
const timerDisplay = document.getElementById("timer");

// ============================
// LOAD QUESTION
// ============================

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 20;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(function () {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);
            nextQuestion();

        }

    }, 1000);

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

    question.textContent =
        questions[currentQuestion].question;

    option1.textContent =
        questions[currentQuestion].options[0];

    option2.textContent =
        questions[currentQuestion].options[1];

    option3.textContent =
        questions[currentQuestion].options[2];

    option4.textContent =
        questions[currentQuestion].options[3];

    result.textContent = "";

    option1.disabled = false;
    option2.disabled = false;
    option3.disabled = false;
    option4.disabled = false;

    option1.style.background = "#FFD700";
    option2.style.background = "#FFD700";
    option3.style.background = "#FFD700";
    option4.style.background = "#FFD700";
}
// ============================
// DISABLE BUTTONS
// ============================

function disableButtons() {

    option1.disabled = true;
    option2.disabled = true;
    option3.disabled = true;
    option4.disabled = true;

}

// ============================
// CHECK ANSWER
// ============================

function checkAnswer(selectedButton) {

    clearInterval(timer);

    disableButtons();

    if (selectedButton.textContent === questions[currentQuestion].answer) {

        selectedButton.style.background = "#28a745";
        result.innerHTML = "✅ Correct Answer!";
        score++;
        console.log("Score:",score);

    } else {

        selectedButton.style.background = "#dc3545";
        result.innerHTML =
            "❌ Correct Answer: <b>" +
            questions[currentQuestion].answer +
            "</b>";

        if (option1.textContent === questions[currentQuestion].answer)
            option1.style.background = "#28a745";

        if (option2.textContent === questions[currentQuestion].answer)
            option2.style.background = "#28a745";

        if (option3.textContent === questions[currentQuestion].answer)
            option3.style.background = "#28a745";

        if (option4.textContent === questions[currentQuestion].answer)
            option4.style.background = "#28a745";
    }

}

// ============================
// OPTION BUTTON EVENTS
// ============================

option1.onclick = function () {
    checkAnswer(option1);
};

option2.onclick = function () {
    checkAnswer(option2);
};

option3.onclick = function () {
    checkAnswer(option3);
};

option4.onclick = function () {
    checkAnswer(option4);
};

// ============================
// NEXT QUESTION
// ============================

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        finishQuiz();

    }

}

// ============================
// NEXT BUTTON
// ============================

nextBtn.onclick = function () {

    nextQuestion();

};
// ============================
// FINISH QUIZ
// ============================

async function finishQuiz() {

    clearInterval(timer);

    const username = localStorage.getItem("username");

    // Save Score to MySQL
    try {

        await fetch("http://localhost:3000/save-score", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                score: score
            })

        });

    } catch (error) {

        console.log("Error Saving Score:", error);

    }

    // Calculate Percentage
    let percentage = Math.round((score / questions.length) * 100);

    // Badge
    let badge = "";

    if (percentage >= 90) {

        badge = "🥇 Dharma Scholar";

    } else if (percentage >= 75) {

        badge = "🥈 Veda Explorer";

    } else if (percentage >= 50) {

        badge = "🥉 Sanātana Learner";

    } else {

        badge = "📖 Keep Practicing";

    }

    // Motivational Message
    let message = "";

    if (percentage >= 90) {

        message = "Outstanding! You have excellent knowledge of Sanātana Dharma.";

    } else if (percentage >= 75) {

        message = "Very Good! Keep exploring our sacred scriptures.";

    } else if (percentage >= 50) {

        message = "Good effort! Practice a little more.";

    } else {

        message = "Don't worry. Every great journey starts with learning.";
    }

    questionNumber.innerHTML = "🎉 Quiz Completed";

    question.innerHTML = `
        <h2>Congratulations ${username}! 🎊</h2>

        <h3>Your Score</h3>

        <h1>${score} / ${questions.length}</h1>

        <h3>${percentage}%</h3>

        <p>${badge}</p>

        <p>${message}</p>
    `;

    option1.style.display = "none";
    option2.style.display = "none";
    option3.style.display = "none";
    option4.style.display = "none";

    nextBtn.style.display = "none";

    restartBtn.style.display = "inline-block";

    result.innerHTML = "";
}
// ============================
// RESTART QUIZ
// ============================

restartBtn.onclick = function () {

    localStorage.removeItem("username");

    location.href = "index.html";

};

// ============================
// LEADERBOARD
// ============================

async function loadLeaderboard() {

    try {

        const response = await fetch("http://localhost:3000/leaderboard");

        const data = await response.json();

        console.log("Leaderboard");

        console.table(data);

    } catch (error) {

        console.log("Leaderboard Error");

    }

}

// ============================
// START QUIZ
// ============================

loadQuestion();