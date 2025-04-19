let questions = [
    {
        "question": "In welchem Bundesland liegt das Dorf Hauröden?",
        "answer_1": "Niedersachsen",
        "answer_2": "Thüringen",
        "answer_3": "Sachsen-Anhalt",
        "answer_4": "Hessen",
        "right_answer": 2
    },
    {
        "question": "Zu welcher Verwaltungsgemeinschaft gehört Hauröden?",
        "answer_1": "Verwaltungsgemeinschaft Kranichfeld",
        "answer_2": "Verwaltungsgemeinschaft Dingelstädt",
        "answer_3": "Verwaltungsgemeinschaft Obereichsfeld",
        "answer_4": "Verwaltungsgemeinschaft Am Ohmberg",
        "right_answer": 4
    },
    {
        "question": "Was ist eine bekannte Sehenswürdigkeit in Hauröden?",
        "answer_1": "Die Wartburg",
        "answer_2": "Die Burgruine Scharfenstein",
        "answer_3": "Die Dorfkirche Hauröden",
        "answer_4": "Das Schloss Friedenstein",
        "right_answer": 3
    },
    {
        "question": "Wie heißt die nächstgrößere Stadt in der Nähe von Hauröden?",
        "answer_1": "Eisenach",
        "answer_2": "Heilbad Heiligenstadt",
        "answer_3": "Nordhausen",
        "answer_4": "Leinefelde-Worbis",
        "right_answer": 4
    },
    {
        "question": "Welche Postleitzahl hat Hauröden?",
        "answer_1": "37345",
        "answer_2": "99976",
        "answer_3": "99734",
        "answer_4": "37327",
        "right_answer": 1
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion()
};

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
};

function gameIsOver(){
    return currentQuestion >= questions.length
};

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnser = `answer_${question['right_answer']}`

    if (rightAnswerSelected(selectedQuestionNumber, question)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnser).parentNode.classList.add('bg-success')
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
};

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('end-screen').style = 'display: none;';
    document.getElementById('question-body').style = '';
    document.getElementById('header-image').src = 'img/Quizlogo.svg';
    currentQuestion = 0;
    rightQuestions = 0;
    init();

};

function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = './img/trophy.svg';
};

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
};

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width:${percent}%;`;
}