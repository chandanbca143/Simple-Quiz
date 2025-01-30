const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedButton = null; 

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Check";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.correct = answer.correct;
        button.addEventListener("click", () => selectAnswer(button));
    });

    nextButton.style.display = "block";
    nextButton.innerHTML = "Check"; 
    nextButton.disabled = true; 
}

function resetState() {
    nextButton.style.display = "none";
    nextButton.disabled = false; 
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    selectedButton = null;
}

function selectAnswer(button) {
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }
    selectedButton = button;
    button.classList.add("selected"); 
    nextButton.disabled = false;
}

function checkAnswer() {
    if (!selectedButton) return; 

    let isCorrect = selectedButton.dataset.correct === "true";

   
    selectedButton.classList.add(isCorrect ? "correct" : "wrong");

   
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    if (isCorrect) score++;

    nextButton.innerHTML = "Next"; 
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Check") {
        checkAnswer();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
