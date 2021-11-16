'use strict';

import { QUIZ_CONTAINER_ID, NEXT_QUESTION_BUTTON_ID, SCORE_SPAN_ID } from '../constants.js';
import { clearDOMElement, getDOMElement, getKeyByValue, checkAnswer, getCardElements, getCurrentContent, getInactiveCardElements, getCardContent } from '../utils/DOMUtils.js';
import { quizData, timerData, animationData } from '../data.js';
import { nextQuestion, showResult } from '../listeners/questionListeners.js';
import { createResultContainerElement } from '../views/questionViews.js'

export const incrementQuestionIndex = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
};

export const showCurrentQuestion = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const timeCount = document.querySelector('.current-timer');
  let time = currentQuestion.time;

  const timerCountdown = () => {
    // Timer countdown gets the time variable from Line 21 which gets the data from data.js
    time > 0 ? time-- : time = 0;
    timeCount.textContent = time;
    // when the timer is 0, the correct answer assigned. 
    if (time === 0) {
      currentQuestion.selected = currentQuestion.correct;
      // if the answer assigned, timerCountdown stops. Otherwise, it keeps assigning every second
      clearInterval(timerData.counter);
    }
  }
  timerData.counter = setInterval(timerCountdown, 1000);
  
  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);
  nextQuestionButton.removeEventListener('click', nextQuestion);
  quizData.isAnswered = false;
};

export const deleteQuestionCard = () => {
  const card = getCardElements();
  let currentContent = getCurrentContent();
  const cardContent = getCardContent();
  const cardContentNumber = 9 - animationData.i;

  cardContent[cardContentNumber].classList.remove("active");

  card[animationData.layer - 1].style.height = "0";
  card[animationData.layer - 1].style.padding = "0";
  card[animationData.layer - 1].classList.remove("active");
  card[animationData.layer - 1].classList.add("inactive");

  animationData.i += 1;
  animationData.step += 10;
  animationData.layer -= 1;

  card[9 - animationData.i].style.animation = 'neon 2s ease-in-out infinite alternate';

  if (animationData.i < cardContent.length) {
    document.getElementById("step").style.width = animationData.step + "%";
    const nextCardContentNumber = 9 - animationData.i;
    const nextItem = cardContent[nextCardContentNumber];
    currentContent = nextItem.classList.add("active");
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
  scoreSpan.innerText = currentScore;
};

export const clearQuizContainer = () => {
  const quizContainer = getDOMElement(QUIZ_CONTAINER_ID);
  clearDOMElement(quizContainer);
};

export function handleSelectedAnswer(evt) {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);

  currentQuestion.selected = getKeyByValue(currentQuestion.answers, evt.target.textContent);

  clearInterval(timerData.counter);
  nextQuestionButton.addEventListener('click', nextQuestion);
  const isCorrect = checkAnswer(currentQuestion.selected, currentQuestion.correct);

  if (isCorrect && quizData.isAnswered === false) {
    quizData.currentTotalScore += 1;
    evt.target.classList.add('correct-answer');
    quizData.isAnswered = true;
  } else {
    evt.target.classList.add('wrong-answer');
    const allAnswerElement = document.querySelector('.card-content.active').querySelectorAll('ol li');
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
  }
};

export const showQuizResult = () => {
  clearQuizContainer();
  const userInterfaceContainer = getDOMElement('user-interface');
  const resultPage = createResultContainerElement();
  userInterfaceContainer.appendChild(resultPage);
};
