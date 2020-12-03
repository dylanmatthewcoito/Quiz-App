'use strict';

const QUESTIONS = [
  {
    text: "Which of these countries have NOT vowed to use only 100% renewable energy by 2050?",
    options: [ 'Afghanistan', 'Guatemala', 'Vietnam', 'Canada'],
    correct: 3
  },
  {
    text: "Which country has not run completely on renewable energy?",
    options: [ 'The USA', 'Portugal', 'Costa Rica', 'Denmark'],
    correct: 0
  },
  {
    text: "Which of the following is NOT considered to be a source of renewable energy??",
    options: [ 'Hydropower', 'Natural Gas', 'Wind', 'Solar'],
    correct: 1
  },
  {
    text: "Which of the following are negative impacts of using fossil fuels?",
    options: [ 'They contribute to environmental degradation and pollution', 'They harm local communities', 'They contribute to human health problems', 'All of the above'],
    correct: 3
  },
  {
    text: "In 2016, about how much of the United State’s energy consumption derived from renewable sources?",
    options: [ '1%', '10%', '40%', '70%'],
    correct: 1
  },
  {
    text: "In the United States, which is one of the fastest growing renewable energy sectors?",
    options: [ 'Solar', 'Hydropower', 'Geothermal', 'None of the above'],
    correct: 0
  },
  {
    text: "Which US state has proposed to commit to 100% renewable energy electricity?",
    options: [ 'Hawaii', 'California', 'Both Hawaii and California', 'None of the above'],
    correct: 2
  }
];

const STATE = {
  score: 0,
  current: 0
};

function resetState() {
  STATE.score = 0;
  STATE.current = 0;
}

function optionHTML(text, qIndex, oIndex) {
  return `<input type="radio" name="q${qIndex}" id="q${qIndex}-${oIndex}" value="${oIndex}"><label for="q${qIndex}=1">${text}</label>`;
}

function questionOptions(options, qIndex) {
  var options = $(options.map((o, idx) => optionHTML(o.text, qIndex, idx)).join('<br/>')
  );
  options.first().attr('selected', 'selected');
  return options;
}


function renderCurrentQuestion() {
  $('#currentScore').text(`Score: ${STATE.score}`);
  $('#nextQuestion').hide();

  const question = QUESTIONS[STATE.current];
  $('#questionText').text(question.text);
  $('#options').html(questionOptions(question.options, STATE.current));
  
}

function questionSubmitted(e) {
  e.preventDefault();
  const valueSelected = Number(
    $(`input[name=q${STATE.current}]:selected`).val()
  );

  if (Number.isNaN(valueSelected)) {
    alert("Please select a option");
    return;
  }

  const question = QUESTIONS[STATE.current];
  if (valueSelected === question.correct) {
    score++;
    $('#nextQuestion > span').text('You are correct!');
  } else {
    const correctText = question.options[question.correct];
    $('#nextQuestion > span').text(
      `You are wrong :(. The correct answer was '${correctText}'`
    );
  }
  $('#nextQuestion').show();
}

function renderEndScreen() {
  $('#finalScore').text(STATE.score);
  hideAll();
  $('#endScreen').show();
}

function nextQuestion(e) {
  e.preventDefault();
  STATE.current++;

  if (STATE.current >= QUESTIONS.length) {
    renderEndScreen();
  } else {
    renderNextQuestion();
  }
}

function hideAll() {
  $('#startScreen').hide();
  $('#endScreen').hide();
  $('#questionScreen').hide();
}


$(function() {
  hideAll();
  $('#startScreen').show(); 

  $('.startQuiz').click((e) => {
    e.preventDefault();
    resetState();
    hideAll();
    renderCurrentQuestion();
    $('#questionScreen').show();
  });

  $('#submitAnswer').click(questionSubmitted);
  $('#nextQuestion > button').click(nextQuestion);
});
