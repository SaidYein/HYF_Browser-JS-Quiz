'use strict';

import {
  NEXT_QUESTION_BUTTON_ID,
  SCORE_SPAN_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import {
  clearDOMElement,
  getDOMElement,
  getKeyByValue,
  checkAnswer,
  getCardElements,
  getCurrentContent,
  getCardContent,
} from '../utils/DOMUtils.js';
import { quizData, animationData } from '../data.js';
import {
  nextQuestion,
  showResult,
  selectedAnswer,
} from '../listeners/questionListeners.js';
import { getCurrentQuestion } from '../views/questionViews.js';
import { createResultPage } from '../views/resultPageView.js';

export const incrementQuestionIndex = () => {
  quizData.currentQuestionIndex += 1;
};
export const showCurrentQuestion = () => {
  const currentIndex = quizData.currentQuestionIndex;
  //* Adding eventListener for answers for current question
  const answers = document.getElementsByClassName(`answer${currentIndex}`);
  for (let answer of answers) {
    answer.addEventListener('click', selectedAnswer);
  }
  //*
  const timeCount = document.querySelector('.current-timer');
  let time = quizData.time;
  timeCount.innerText = `Time left: ${time}`;
  const timerCountdown = () => {
    // Timer countdown gets the time variable from Line 21 which gets the data from data.js
    time > 0 ? time-- : (time = 0);
    timeCount.textContent = `Time left: ${time}`;
    // when the timer is 0, the correct answer assigned.
    if (time === 0) {
      showCorrectAnswer();
      for (let answer of answers) {
        answer.removeEventListener('click', selectedAnswer);
      }
      nextQuestionButton.addEventListener('click', nextQuestion);
      // if the answer assigned, timerCountdown stops. Otherwise, it keeps assigning every second
      clearInterval(quizData.counter);
    }
  };
  quizData.counter = setInterval(timerCountdown, 1000);

  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);
  nextQuestionButton.removeEventListener('click', nextQuestion);
  quizData.isAnswered = false;
};

export const deleteQuestionCard = () => {
  const card = getCardElements();
  let currentContent = getCurrentContent();
  const cardContent = getCardContent();
  const cardContentNumber = 9 - animationData.i;

  cardContent[cardContentNumber].classList.remove('active');

  card[animationData.layer - 1].style.height = '0';
  card[animationData.layer - 1].style.padding = '0';
  card[animationData.layer - 1].classList.remove('active');
  card[animationData.layer - 1].classList.add('inactive');

  animationData.i += 1;
  animationData.step -= 10;
  animationData.layer -= 1;

  card[9 - animationData.i].style.animation =
    'neon-blue 2s ease-in-out infinite alternate';

  if (animationData.i < cardContent.length) {
    document.getElementById('step').style.height = animationData.step + '%';
    const nextCardContentNumber = 9 - animationData.i;
    const nextItem = cardContent[nextCardContentNumber];
    currentContent = nextItem.classList.add('active');
  }
  if (animationData.i == 9) {
    const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);
    nextQuestionButton.innerText = 'Show Result';
    nextQuestionButton.removeEventListener('click', nextQuestion);
    nextQuestionButton.addEventListener('click', showResult);
  }
};

export const showCurrentScore = () => {
  const currentScore = quizData.currentTotalScore;
  const scoreSpan = getDOMElement(SCORE_SPAN_ID);
  scoreSpan.innerText = `Score: ${currentScore}`;
};

export const clearUserInterface = () => {
  const userInterface = getDOMElement(USER_INTERFACE_ID);
  clearDOMElement(userInterface);
};

export const handleSelectedAnswer = (evt) => {
  const currentIndex = quizData.currentQuestionIndex;
  //* Removing eventListeners from all current answers after one click
  const answers = document.getElementsByClassName(`answer${currentIndex}`);
  for (let answer of answers) {
    answer.removeEventListener('click', selectedAnswer);
  }
  //*
  const currentQuestion = getCurrentQuestion();
  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);

  currentQuestion.selected = getKeyByValue(
    currentQuestion.answers,
    evt.target.textContent
  );

  clearInterval(quizData.counter);
  nextQuestionButton.addEventListener('click', nextQuestion);
  const isCorrect = checkAnswer(
    currentQuestion.selected,
    currentQuestion.correct
  );

  if (isCorrect && quizData.isAnswered === false) {
    quizData.currentTotalScore += 1;
    evt.target.classList.add('correct-answer');
    quizData.isAnswered = true;
  }
  if (isCorrect && quizData.isAnswered) {
    evt.target.classList.add('correct-answer');
  } else {
    evt.target.classList.add('wrong-answer');
    showCorrectAnswer();
  }
};

export const showQuizResult = () => {
  clearUserInterface();
  const userInterfaceContainer = getDOMElement(USER_INTERFACE_ID);
  const resultPage = createResultPage();
  userInterfaceContainer.appendChild(resultPage);
};

export const showCorrectAnswer = () => {
  const currentQuestion = getCurrentQuestion();
  const allAnswerElement = document
    .querySelector('.card-content.active')
    .querySelectorAll('ol li');
  switch (currentQuestion.correct) {
    case 'a':
      allAnswerElement[0].classList.add('correct-answer');
      break;
    case 'b':
      allAnswerElement[1].classList.add('correct-answer');
      break;
    case 'c':
      allAnswerElement[2].classList.add('correct-answer');
      break;
    case 'd':
      allAnswerElement[3].classList.add('correct-answer');
      break;
  }
};
