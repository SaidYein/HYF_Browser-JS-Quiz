'use strict';

import { QUESTION_CONTAINER_ID, QUIZ_CONTAINER_ID, SCORE_SPAN_ID, NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { createQuestionElement } from '../views/questionViews.js';
import { clearDOMElement, getDOMElement, getKeyByValue, checkAnswer} from '../utils/DOMUtils.js';
import { quizData, timerData, animationData } from '../data.js';
import { nextQuestion } from '../listeners/questionListeners.js'

export const incrementQuestionIndex = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
};

export const showCurrentQuestion = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionElement = createQuestionElement(currentQuestion);
  const questionContainer = getDOMElement(QUESTION_CONTAINER_ID);
  clearDOMElement(questionContainer);
  questionContainer.appendChild(questionElement);

  const timeCount = document.querySelector('.timer .timer_sec')
  let time = currentQuestion.time;
  
  const timerCountdown = () => {
    // Timer countdown gets the time variable from Line 21 which gets the data from data.js
    time > 0 ? time -- : time = 0;
    timeCount.textContent = time;
    // when the timer is 0, the correct answer assigned. 
    if(time===0){
      currentQuestion.selected = currentQuestion.correct
      // if the answer assigned, timerCountdown stops. Otherwise, it keeps assigning every second
      clearInterval(timerData.counter)
      //
    }
  }
  timerData.counter = setInterval(timerCountdown, 1000)
  
  
  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);
  nextQuestionButton.removeEventListener('click', nextQuestion);
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

  clearInterval(timerData.counter)
  nextQuestionButton.addEventListener('click', nextQuestion);
};

export function handleQuestionResult() {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const isCorrect = checkAnswer(currentQuestion.selected, currentQuestion.correct);
  if (isCorrect) {
    quizData.currentTotalScore += 1
  }
};
