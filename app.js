'use strict';


const store = {

  questions: [
    { // Question 1
      question: 'Which of these countries have NOT vowed to use only 100% renewable energy by 2050?',
        answers: [ 'Afghanistan', 'Guatemala', 'Vietnam', 'Canada'
      ],
      correctAnswer: 'Canada'
    },
    { // Question 2
      question: 'Which country has not run completely on renewable energy?',
      answers: [ 'The USA', 'Portugal', 'Costa Rica', 'Denmark'
      ],
      correctAnswer: 'The USA'
    },
    { // Question 3
      question: 'Which of the following is NOT considered to be a source of renewable energy?',
      answers: [ 'Hydropower', 'Natural Gas', 'Wind', 'Solar'
      ],
      correctAnswer: 'Natural Gas'
    },
    { // Question 4
      question: 'Which of the following are negative impacts of using fossil fuels?',
      answers: [ 'They contribute to environmental degradation and pollution', 'They harm local communities', 'They contribute to human health problems', 'All of the above'
      ],
      correctAnswer: 'All of the above'
    },
    { // Question 5
      question: 'In 2016, about how much of the United State’s energy consumption derived from renewable sources?',
      answers: [ '1%', '10%', '40%', '70%'
      ],
      correctAnswer: '10%'
    },
    { // Question 6
      question: 'In the United States, which is one of the fastest growing renewable energy sectors?' ,
      answers: [ 'Solar', 'Hydropower', 'Geothermal', 'None of the above'
      ],
      correctAnswer: 'Solar'
    },
    { // Question 7
      question: 'Which US state has proposed to commit to 100% renewable energy electricity?',
      answers: [ 'Hawaii', 'California', 'Both Hawaii and California', 'None of the above'
      ],
      correctAnswer: 'Both Hawaii and California'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  submittingAnswer: false,
  score: 0,

  currentQuestionState: {
    answerArray: []
  }
};


function generateWelcomeString() {
  return `
  <div class="welcome">
    <form>
      <p>
        Welcome User. Begin the quiz by pressing the button.
      </p>
      
      <button type="submit"id="beginQuiz" autofocus>Begin Quiz</button>
    </form>
  </div>
    `;
}
function generateQuizInterfaceString(questionObject) {
  console.log(questionObject);
  console.log(questionObject.question.answers);
  return `
    <div class='quiz-interface'>
      <p>Question ${questionObject.index} out of ${store.questions.length}</p>
      <p>
       ${questionObject.question.question}
      </p>

      <form>
      <ol type="A">
        ${generateQuizAnswers(questionObject.question.answers)}
      </ol>
      <button type="submit" class="submit-answer">Submit Answer</button>
      </form> 
      <p>Score: ${store.score}</p>
    </div>
    `;
}


function generateAnswerResults(){
  let answerArray = store.currentQuestionState.answerArray;

  const buttons = {
    next: ' <button type="submit" class="next-question" autofocus>Next Question</button>',
    results: '<button type="submit" class="see-results" autofocus>See Results</button>'
  };

  let correctResponse = `"${answerArray[1]}" is correct`;
  let incorrectResponse = `${answerArray[2]} is not correct. The correct answer is<br><br>
  "${answerArray[1]}"`;

  let isLastQuestion = (store.questionNumber + 1) === (store.questions.length);
  
  return `
    <div class="answer-response">
    <form>
    <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
    <p> Score: ${store.score}</p>
   ${isLastQuestion ? buttons.results : buttons.next}
    </form>
    </div>
  `;
}


function generateQuizAnswers(answers){
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  });
  console.log(indexArray);
  return answerArray.map(answer => stringifyAnswerArray(answer)).join('');
}

function stringifyAnswerArray(answer){
  let questionNumber = store.questionNumber;
  let name = store.questions[questionNumber].answers.indexOf(answer);
  console.log(name);

  return `
    <li>
      <div class="answer-container">
      <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}">
      <label for="answer-${name}"> ${answer}</label>
     
      </div>
    </li>
  `;
}

function generateQuizResultsString(){
  return `
    <div class='quiz-results'>
      <p>
       The Quiz is over.
         </p>
          <p>You scored ${store.score} out of ${store.questions.length * 10}</p>            
        <button class="restart-quiz">Restart Quiz</button>      
    </div>   
   ${generateImage()}  
`;
        }

function generateImage(quizResults) {
   return
   console.log("I'm popping up after the quiz")
      $('main').empty().append('<img src="IMG_3847.jpeg"')

 }


function renderQuiz () {

  if(store.quizStarted === false) {
    if(store.questionNumber === store.questions.length){
      const quizResultsString = generateQuizResultsString();
      const finalImage = generateImage();
      $('main').html(quizResultsString); 
    } else {
      const quizWelcomeInterfaceString = generateWelcomeString();
      $('main').html(quizWelcomeInterfaceString);
    }
  } else if (store.quizStarted === true) {
    if(store.submittingAnswer === false) {
      const quizInterfaceString = generateQuizInterfaceString(currentQuestion());
      $('main').html(quizInterfaceString);
    } else if (store.submittingAnswer === true) {
      const quizAnswerResponseString = generateAnswerResults();
      $('main').html(quizAnswerResponseString);
    }
  } 
}


function startQuiz() {
  console.log('quiz has begun');
  store.quizStarted = true;
}


function currentQuestion(){
  let index = store.questionNumber;
  let questionObject = store.questions[index];
  return {
    index: index +1,
    question: questionObject
  };
}


function nextQuestion(){
  if (store.questionNumber < store.questions.length){
    store.questionNumber++;
    store.submittingAnswer =false;
    console.log(store.questionNumber);
  } else if(store.questionNumber === store.questions.length) {
    store.quizStarted = false;
  }
}


function validateCorrectAnswer() {
  let radios = $('input:radio[name=answer]');
  let selectedAnswer = $('input[name="answer"]:checked').data('answer');
  let questionNumber = store.questionNumber;
  let correctAnswer = store.questions[questionNumber].correctAnswer;

  if (radios.filter(':checked').length === 0) {
    alert('Please select an answer.');
    return;
  } else {
    store.submittingAnswer = true;
    if(selectedAnswer === correctAnswer){
      store.score += 10;
      store.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];
    } else {
      store.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
    }
  }
}

function seeResults() {
  store.quizStarted = false;
  store.questionNumber ++;
}

function restartQuiz() {
  store.quizStarted = false;
  store.questionNumber = 0;
  store.submittingAnswer = false;
  store.currentQuestionState.answerArray = [];
}


function handleBeginQuizSubmit(){
  
  $('main').on('click', '#beginQuiz', (event) =>{
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

function handleSubmitAnswer() {
  $('main').on('click' , '.submit-answer', (event)=>{
    event.preventDefault();
    console.log('submitting answer');
    validateCorrectAnswer();
    renderQuiz();
  });
}

function handleNextQuestionSubmit(){
  $('main').on('click', '.next-question', (event) => {
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

function handleSeeResultsSubmit(){
  $('main').on('click', '.see-results', (event) => {
    event.preventDefault();
    seeResults();
    renderQuiz();
  });
}

function handleRestartQuizSubmit(){
  $('main').on('click', '.restart-quiz', (event) => {
    event.preventDefault();
    restartQuiz();
    renderQuiz();
  });
}


function handleQuiz (){
  renderQuiz();
  handleBeginQuizSubmit();
  handleSubmitAnswer();
  handleNextQuestionSubmit();
  handleRestartQuizSubmit();
  handleSeeResultsSubmit();
}

$(handleQuiz);

