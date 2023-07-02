let currentQuestionIndex = 0;
let timer;
let timeRemaining = 60;

function startQuiz() {
    document.getElementById("finish").style.display = "none";
    document.getElementById("timer").style.display = "block";
    renderQuestion();
    startTimer();
}

function renderQuestion(){
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const currentQuestion = question[currentQuestionIndex];

        questionElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = "";

        currentQuestion.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.addEventListener("click", handleAnswer);
            choicesElement.appendChild(choiceButton);
        });
}

function handleAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = question[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
        document.getElementById("result").textContent = "Correct";
        } else {
            document.getElementById("result").textContent = "Incorrect";
            timeRemaining -= 10;
            if (timeRemaining< 0) {
                timeRemaining = 0;
            }
        }
        currentQuestionIndex++;

       if (currentQuestionIndex === question.length || timeRemaining === 0) {
       endQuiz();
    } else {
        renderQuestion();
    }
}

function startTimer(){
        timer = setInterval(function() {
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

document.getElementById("score-form").addEventListener("submit", function(event){
    event.preventDefault();

    const initials = document.getElementById("initials").value;
    const score = timeRemaining;
});
