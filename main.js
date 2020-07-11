// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        imgSrc : "image_icon/html.png",
        choiceA : "Hyper Text Markup Language",
        choiceB : "Hyper Text Makeup Language",
        choiceC : "Hyphen Text Mark Language",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        imgSrc : "image_icon/css.png",
        choiceA : "Cascading Style Ship",
        choiceB : "Cascading Style Sheet",
        choiceC : "Cascading Sheet Style",
        correct : "B"
    },{
        question : "What does JS stand for?",
        imgSrc : "image_icon/js.png",
        choiceA : "JavaShip",
        choiceB : "JavaSheet",
        choiceC : "JavaScript",
        correct : "C"
    },{
        question : "Which of the following attributes is used to open an hyperlink in new tab?",
        imgSrc : "image_icon/html.png",
        choiceA : "tab",
        choiceB : "href",
        choiceC : "target",
        correct : "C"
    },{
        question : "Which of the following property is used to make a font italic or oblique?",
        imgSrc : "image_icon/css.png",
        choiceA : "font-style",
        choiceB : "font-size",
        choiceC : "italic",
        correct : "A"
    },{
        question : "What is the HTML tag under which one can write the JavaScript code?",
        imgSrc : "image_icon/js.png",
        choiceA : "JavaScript",
        choiceB : "script",
        choiceC : "js",
        correct : "B"
    },{
        question : "How many heading tags are there in HTML5?",
        imgSrc : "image_icon/html.png",
        choiceA : " 2",
        choiceB : " 10",
        choiceC : " 6",
        correct : "C"
    },{
        question : " Which of the following property is used to set the height of an image?",
        imgSrc : "image_icon/css.png",
        choiceA : "border",
        choiceB : "height",
        choiceC : "image",
        correct : "B"
    },{
        question : "Which of the following is not a reserved word in JavaScript?",
        imgSrc : "image_icon/js.png",
        choiceA : "interface",
        choiceB : "throws",
        choiceC : "program",
        correct : "C"
    },{
        question : "What is the font-size of the h1 heading tag?",
        imgSrc : "image_icon/html.png",
        choiceA : "3.5 em",
        choiceB : "2 em",
        choiceC : "1.5 em",
        correct : "B"
    },{
        question : "Which of the following defines a measurement in inches?",
        imgSrc : "image_icon/css.png",
        choiceA : "mm",
        choiceB : "pt",
        choiceC : "in",
        correct : "C"
    },{
        question : "How can you add a comment in a JavaScript?",
        imgSrc : "image_icon/js.png",
        choiceA : "//comment",
        choiceB : "#comment",
        choiceC : "^comment",
        correct : "A"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 5; // 15s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "image_icon/5.png" :
              (scorePerCent >= 60) ? "image_icon/4.png" :
              (scorePerCent >= 40) ? "image_icon/3.png" :
              (scorePerCent >= 20) ? "image_icon/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















