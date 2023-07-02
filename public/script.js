const questions = [
    {
        question: "A coder who can develop both client-side and server-side software is known as a full-___ developer. What word that can also mean a serving of pancakes goes in the blank?",
        choices: ["Stack", "Pile", "Column", "Tower"],
        answer: "Stack",
    },
    {
        question: "Which of the following is not a programming language?",
        choices: ["Python", "HTML", "CSS", "MySQL"],
        answer: "MySQL",
    },
    {
        question: "What does HTML stand for?",
        choices: ["HyperText Markup Language", "High-Level Programming Language", "Home Tool Markup Language", "Hyperlink and Text Manipulation Language"],
        answer: "HyperText Markup Language",
    },
    {
        question: "Which of the following is a dynamically typed programming language?",
        choices: ["Java", "C++", "Python", "C#"],
        answer: "Python",
    },
    {
        question: "What is the purpose of version control systems like Git?",
        choices: ["to manage databases", "to track changes in source code files", "to compile programming languages", "to design user interfaces"],
        answer: "to track changes in source code files",
    },
];

let currentQuestionIndex = 0;
let timer;
let timeRemaining = 60;
let quizScores =[];

function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("finish").style.display = "none";
    document.getElementById("timer").style.display = "block";
    renderQuestion();
    startTimer();
}

function renderQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice-button");
        choiceButton.addEventListener("click", handleAnswer);
        choicesElement.appendChild(choiceButton);
    });
}

function handleAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
        document.getElementById("result").textContent = "Correct";
    } else {
        document.getElementById("result").textContent = "Incorrect";
        timeRemaining -= 10;
        if (timeRemaining < 0) {
            timeRemaining = 0;
        }
    }
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length || timeRemaining === 0) {
        endQuiz();
    } else {
        renderQuestion();
    }
}

function startTimer() {
    timer = setInterval(function () {
        timeRemaining--;
        document.getElementById("time").textContent = timeRemaining;

        if (timeRemaining <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("timer").style.display = "none";
    document.getElementById("finish").style.display = "block";
}

document.getElementById("start-button").addEventListener("click", startQuiz);

document.getElementById("score-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const initials = document.getElementById("initials").value;
    const score = timeRemaining;
});

function updateLeaderboard() {
    quizScores.sort((a, b) => b.score - a.score);

    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    const maxScoreToShow = Math.min(5, quizScores.length);
    for (let i = 0; i <maxScoreToShow; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = `${quizScores[i].initials}: ${quizScores[i].score}`;
        leaderboardList.appendChild(listItem);
    } 

}