let closePage = document.getElementById('closePage');
let checkButton = document.getElementById('checkButton');
let nextButton = document.getElementById('nextButton');
let questionsArea = document.getElementById('questionsArea');
let buttonArea = document.getElementById('buttonArea');
let upperBlock = document.getElementById('upperBlock');
let finishButton = document.getElementById('finishButton');
let testResultsArea = document.getElementById('testResultsArea');
let nextButtonIncorrect = document.getElementById('nextButtonIncorrect');
let correctAnswerPopUp = document.getElementById('correctAnswerPopUp');
let incorrectAnswerPopUp = document.getElementById('incorrectAnswerPopUp');
let numberOfQuestions = 0;
let questionIdIndex = 0; //internal question index at the start point
let testResults = [];
let config = [];
let answerChecked = '';
let answerGiven = '';
let answersGiven = 0
const regExp = /\w*answer\w*/

closePage.addEventListener('click' , event =>{
    document.location.href =  document.referrer;
});

fetch(window.location +  "/JSON")
.then((result) => result.text()).then(text =>{
    let data = JSON.parse(text)
    numberOfQuestions = data.length;
    calculateComlete(answersGiven, numberOfQuestions)
    data.forEach(item =>{
        run(item);
    });
    //correctAnswers(config);
    render()
  }).catch(err =>{
    console.log(err);
});


function addInfo(item){
    item.display = 'none';
    item.status = 'notGiven';
    item.internalId = questionIdIndex;
    questionIdIndex++;
    //console.log(item)
};

function calculateComlete(answersGiven, numberOfQuestions){
    let width = (answersGiven/numberOfQuestions)*100 + "%";
    let progressComplete = document.getElementById('progressComplete');
    progressComplete.style.width = width;
};

function createDOM(item){
    config.push({question: item.internalId , correctAnswer: item.correctAnswer});

    let questionsArea = document.getElementById('questionsArea');
    let question = document.createElement('div');
    question.setAttribute('class', 'question')
    question.setAttribute('id', 'question' +  item.internalId)
    question.style.display = 'none';
    questionsArea.append(question);

    let questionId = "Question " + (item.internalId + 1) ;
    let questionIdDiv = document.createElement('div');
    questionIdDiv.setAttribute('class', 'questionNumber')
    questionIdDiv.innerHTML = questionId
    question.append(questionIdDiv);

    let questionText = document.createElement('div');
    questionText.setAttribute('class', 'questionText');
    questionText.innerHTML = item.question;
    question.append(questionText);

    let specifyAnswer = document.createElement('div');
    specifyAnswer.setAttribute('class', 'specifyAnswer');
    specifyAnswer.innerHTML = "Specify correct answer";
    question.append(specifyAnswer);

   let answersParent = document.createElement('div')
   answersParent.setAttribute('class', 'answersParent');
   question.append(answersParent);
   for(i=1; i<=4; i++){
       let answerBlock = document.createElement('div')
       answerBlock.setAttribute('class', 'answerBlock');
       answersParent.append(answerBlock);

       let checkBox = document.createElement('div')
       checkBox.setAttribute('class', 'answerBlock__checkBox');
       answerBlock.append(checkBox);

       let answerText = document.createElement('div');
       answerText.setAttribute('class', 'answerBlock__answerText');
       answerBlock.append(answerText);

       if(i == 1){
            answerText.innerHTML = item.answer1;
            answerBlock.setAttribute('id', "question" + item.internalId + "answer1" + "_answerBlock");
            checkBox.setAttribute('id', "question" + item.internalId + "answer1" + "_checkBox");
            answerText.setAttribute('id', "question" + item.internalId + "answer1" + "_answerText");

       } else if (i == 2){
            answerText.innerHTML = item.answer2;
            answerBlock.setAttribute('id', "question" + item.internalId + "answer2" + "_answerBlock");
            checkBox.setAttribute('id', "question" + item.internalId + "answer2" + "_checkBox");
            answerText.setAttribute('id', "question" + item.internalId + "answer2"+ "_answerText");
       } else if( i == 3){
            answerText.innerHTML = item.answer3;   
            answerBlock.setAttribute('id', "question" + item.internalId + "answer3"+ "_answerBlock");
            checkBox.setAttribute('id', "question" + item.internalId + "answer3" + "_checkBox");
            answerText.setAttribute('id', "question" + item.internalId + "answer3"+ "_answerText");
       } else {
            answerText.innerHTML = item.answer4;   
            answerBlock.setAttribute('id', "question" + item.internalId + "answer4"+ "_answerBlock");
            checkBox.setAttribute('id', "question" + item.internalId + "answer4" + "_checkBox");
            answerText.setAttribute('id', "question" + item.internalId + "answer4"+ "_answerText");
       };
   };
};

function run(item){
    addInfo(item);
    createDOM(item);
};

function render(){
    calculateComlete(answersGiven, numberOfQuestions);
    let questions = document.getElementsByClassName('question');
    [...questions].forEach(item =>{
        let questionId = parseInt(item.id.match(/\d+/)[0]);
        if(questionId == answersGiven){
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        };
    });
};

function checkAnswersGivenIndex(){
    if (answersGiven < numberOfQuestions){
        return true;
    } else {
        return false;
    };
};

function correctAnswers(config){
    config.forEach(item =>{
        let rnd = Math.floor(Math.random(0, 1)*4 +1);
        item.correctAnswer = rnd;
    })
};

function answerIsClicked(id){
    clearClasses(id);
    let answerBlock = document.getElementById(id +  "_answerBlock");
    let checkBox = document.getElementById(id +  "_checkBox");
    let answerText = document.getElementById(id +  "_answerText");

    answerBlock.className = 'answerBlock answerBlock_checked';
    checkBox.className = "answerBlock__checkBox answerBlock__checkBox_checked";
    answerText.className = "answerBlock__answerText answerBlock__answerText_checked";

    answerChecked = id;
};

function clearClasses(id){
    let answerBlocks = document.getElementsByClassName('answerBlock');
    [...answerBlocks].forEach(item =>{
        item.className = 'answerBlock';
    });
    let checkBoxes = document.getElementsByClassName('answerBlock__checkBox');
    [...checkBoxes].forEach(item =>{
        item.className = 'answerBlock__checkBox';
    });
    let answerTexts = document.getElementsByClassName('answerBlock__answerText');
    [...answerTexts].forEach(item =>{
        item.className = 'answerBlock__answerText';
    });
};

function checkAnswer(){
    let questionNum = parseInt(answerGiven.match(/\d+/gi)[0]);
    let answerNum = parseInt(answerGiven.match(/\d+/gi)[1]);
    answerGiven = {question:questionNum, userAnswer: answerNum};
    //console.log(config[questionNum]);
    if(config[questionNum].correctAnswer == answerNum){
        return true;
    } else {
        return false;
    }
};

function insertCorrectAnswerText(){
    console.log(config[answerGiven.question]);
    let elementId = "question" +  config[answerGiven.question].question +  "answer" + config[answerGiven.question].correctAnswer + "_answerText";
    let from = document.getElementById(elementId);
    let to  = document.getElementById('rightAnswerText');
    to.innerHTML = "  the right answer is " + from.innerHTML;
};

function insertIncorrectAnswerText(){
    let elementId = "question" +  config[answerGiven.question].question +  "answer" + config[answerGiven.question].correctAnswer + "_answerText";
    let from = document.getElementById(elementId);
    let to  = document.getElementById('wrongAnswerText');
    to.innerHTML = "    the right answer is " + from.innerHTML;
};

function renderResults(){
    let index = 0;
    testResults.forEach((result) =>{
        index = index + result.score
    });
    console.log(index)
    console.log(testResults.length);
    let percent = Math.floor((index/testResults.length)*100);
    let circleResult = document.getElementById('circle_result')
    circleResult.className = "c100 p" + percent + " custom";

    let textResult = document.getElementById('textResult');
    textResult.innerHTML = "Your result is " + index + "/" + testResults.length + " correct answers";

    let circleTextResult = document.getElementById('circleTextResult');
    circleTextResult.innerHTML = index + "/" + testResults.length;

}

document.addEventListener('click', function(event){
    let eventId = event.target.id;
    let match = eventId.match(regExp);
    if(match != null){
        let id = match.input.split('_')[0];
        answerIsClicked(id);
    };
});

checkButton.addEventListener('click', event =>{
    answerGiven = answerChecked;
    if(checkAnswer()){
        correctAnswerPopUp.style.display = 'flex';
        testResults.push({question: answerGiven.question , score: 1});
        insertCorrectAnswerText();
    } else {
        incorrectAnswerPopUp.style.display = 'flex';
        testResults.push({question: answerGiven.question , score: 0});
        insertIncorrectAnswerText();
    };
    answersGiven++;
});

nextButton.addEventListener('click' , function(){
    correctAnswerPopUp.style.display = 'none';
    incorrectAnswerPopUp.style.display = 'none';
    if(checkAnswersGivenIndex()){
        render(answersGiven);
    } else {
        testResultsArea.style.display = 'block';
        questionsArea.style.display = 'none';
        buttonArea.style.display = 'none';
        upperBlock.style.display = 'none';
        renderResults();
    };
});

nextButtonIncorrect.addEventListener('click' , function(){
    correctAnswerPopUp.style.display = 'none';
    incorrectAnswerPopUp.style.display = 'none';
    if(checkAnswersGivenIndex()){
        render(answersGiven);
    } else {
        testResultsArea.style.display = 'block';
        questionsArea.style.display = 'none';
        buttonArea.style.display = 'none';
        upperBlock.style.display = 'none';
        renderResults();
    };
});

finishButton.addEventListener('click' , () =>{
    window.location.href = window.location.origin;
})




