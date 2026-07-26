const questions = [
    {
        question: "Who delivered the Bhagavad Gita?",
        options: ["Lord Krishna", "Valmiki", "Vyasa", "Tulsidas"],
        answer: "Lord Krishna"
    },
    {
        question: "Who wrote the Ramayana?",
        options: ["Valmiki", "Vyasa", "Kalidasa", "Tulsidas"],
        answer: "Valmiki"
    },
    {
        question: "Who compiled the Vedas?",
        options: ["Vyasa", "Valmiki", "Narada", "Vishwamitra"],
        answer: "Vyasa"
    }
];

let currentQuestion = 0;
let score = 0;

const username = localStorage.getItem("username");

const title = document.getElementById("title");
const question = document.getElementById("question");

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {

    title.textContent = "Question " + (currentQuestion + 1);

    question.textContent = questions[currentQuestion].question;

    option1.textContent = questions[currentQuestion].options[0];
    option2.textContent = questions[currentQuestion].options[1];
    option3.textContent = questions[currentQuestion].options[2];
    option4.textContent = questions[currentQuestion].options[3];

    result.textContent = "";

    option1.disabled = false;
    option2.disabled = false;
    option3.disabled = false;
    option4.disabled = false;

    option1.style.backgroundColor = "";
    option2.style.backgroundColor = "";
    option3.style.backgroundColor = "";
    option4.style.backgroundColor = "";
}

function disableOptions() {
    option1.disabled = true;
    option2.disabled = true;
    option3.disabled = true;
    option4.disabled = true;
}

function checkAnswer(selectedOption) {

    if (selectedOption === questions[currentQuestion].answer) {
        result.textContent = "✅ Correct!";
        score++;
    } else {
        result.textContent = "❌ Wrong!";
    }

    if (option1.textContent === questions[currentQuestion].answer)
        option1.style.backgroundColor = "green";

    if (option2.textContent === questions[currentQuestion].answer)
        option2.style.backgroundColor = "green";

    if (option3.textContent === questions[currentQuestion].answer)
        option3.style.backgroundColor = "green";

    if (option4.textContent === questions[currentQuestion].answer)
        option4.style.backgroundColor = "green";

    if (selectedOption !== questions[currentQuestion].answer) {

        if (option1.textContent === selectedOption)
            option1.style.backgroundColor = "red";

        if (option2.textContent === selectedOption)
            option2.style.backgroundColor = "red";

        if (option3.textContent === selectedOption)
            option3.style.backgroundColor = "red";

        if (option4.textContent === selectedOption)
            option4.style.backgroundColor = "red";
    }

    disableOptions();
}

option1.onclick = function () {
    checkAnswer(option1.textContent);
};

option2.onclick = function () {
    checkAnswer(option2.textContent);
};

option3.onclick = function () {
    checkAnswer(option3.textContent);
};

option4.onclick = function () {
    checkAnswer(option4.textContent);
};

nextBtn.onclick = function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        title.textContent = "🎉 Quiz Finished!";
        question.textContent = "Congratulations, " + username + "!";

        option1.style.display = "none";
        option2.style.display = "none";
        option3.style.display = "none";
        option4.style.display = "none";

        nextBtn.style.display = "none";
        restartBtn.style.display = "inline-block";

        result.textContent = "Your Score: " + score + " / " + questions.length;
    }
};

restartBtn.onclick = function () {
    location.reload();
};

loadQuestion();