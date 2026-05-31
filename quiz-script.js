const questions = [
{
    question: "What does HTML stand for?",
    answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "High Text Machine Language", correct: false },
        { text: "Hyper Transfer Markup Language", correct: false },
        { text: "Home Tool Markup Language", correct: false }
    ]
},
{
    question: "Which language is used for styling web pages?",
    answers: [
        { text: "HTML", correct: false },
        { text: "CSS", correct: true },
        { text: "Python", correct: false },
        { text: "Java", correct: false }
    ]
},
{
    question: "Which company developed JavaScript?",
    answers: [
        { text: "Microsoft", correct: false },
        { text: "Google", correct: false },
        { text: "Netscape", correct: true },
        { text: "Apple", correct: false }
    ]
},
{
    question: "Which keyword declares a variable in JavaScript?",
    answers: [
        { text: "var", correct: true },
        { text: "int", correct: false },
        { text: "string", correct: false },
        { text: "float", correct: false }
    ]
},
{
    question: "What does CSS stand for?",
    answers: [
        { text: "Creative Style Sheets", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Sheets", correct: false }
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionNumber.innerHTML =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.innerHTML = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect =
        selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}!`;

    questionNumber.innerHTML = "Quiz Completed 🎉";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {

    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

});

startQuiz();
