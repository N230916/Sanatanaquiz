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
}
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timer;

const username = localStorage.getItem("username");

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

function loadQuestion() {

    clearInterval(timer);

    timeLeft = 20;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }

    }, 1000);

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    question.textContent = questions[currentQuestion].question;

    option1.textContent = questions[currentQuestion].options[0];
    option2.textContent = questions[currentQuestion].options[1];
    option3.textContent = questions[currentQuestion].options[2];
    option4.textContent = questions[currentQuestion].options[3];

    result.innerHTML = "";

    [option1, option2, option3, option4].forEach(btn => {
        btn.disabled = false;
        btn.style.background = "#FFD700";
    });
}

function disableButtons() {
    option1.disabled = true;
    option2.disabled = true;
    option3.disabled = true;
    option4.disabled = true;
}

function checkAnswer(selectedButton) {

    clearInterval(timer);
    disableButtons();

    if (selectedButton.textContent === questions[currentQuestion].answer) {

        selectedButton.style.background = "#28a745";
        result.innerHTML = "✅ Correct Answer!";
        score++;

    } else {

        selectedButton.style.background = "#dc3545";
        result.innerHTML = `❌ Correct Answer: <b>${questions[currentQuestion].answer}</b>`;

        [option1, option2, option3, option4].forEach(btn => {
            if (btn.textContent === questions[currentQuestion].answer) {
                btn.style.background = "#28a745";
            }
        });
    }
}

option1.onclick = () => checkAnswer(option1);
option2.onclick = () => checkAnswer(option2);
option3.onclick = () => checkAnswer(option3);
option4.onclick = () => checkAnswer(option4);

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

nextBtn.onclick = nextQuestion;

async function finishQuiz() {

    clearInterval(timer);

    const userId = localStorage.getItem("userId");

    try {

        await fetch("http://localhost:3000/update-score", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userId,
                score: score
            })
        });

    } catch (err) {
        console.log(err);
    }

    let percentage = Math.round((score / questions.length) * 100);

    let badge = percentage >= 90 ? "🥇 Dharma Scholar"
        : percentage >= 75 ? "🥈 Veda Explorer"
        : percentage >= 50 ? "🥉 Sanātana Learner"
        : "📖 Keep Practicing";

    let message = percentage >= 90
        ? "Outstanding! You have excellent knowledge of Sanātana Dharma."
        : percentage >= 75
        ? "Very Good! Keep exploring our sacred scriptures."
        : percentage >= 50
        ? "Good effort! Practice a little more."
        : "Don't worry. Every great journey starts with learning.";

    questionNumber.innerHTML = "🎉 Quiz Completed";

    question.innerHTML = `
        <h2>Congratulations ${username}! 🎊</h2>
        <h3>Your Score</h3>
        <h1>${score}/${questions.length}</h1>
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

restartBtn.onclick = function () {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    location.href = "index.html";
};

async function loadLeaderboard() {

    try {

        const response = await fetch("http://localhost:3000/leaderboard");
        const data = await response.json();
        console.table(data);

    } catch (err) {
        console.log(err);
    }
}

loadQuestion();