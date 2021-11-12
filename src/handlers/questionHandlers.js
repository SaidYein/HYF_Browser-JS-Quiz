'use strict';

import { QUESTION_CONTAINER_ID, NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { createQuestionElement } from '../views/questionViews.js';
import { clearDOMElement, getDOMElement, getKeyByValue, checkAnswer, startTimer,endTimer } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';
import { nextQuestion } from '../listeners/questionListeners.js'
export const incrementQuestionIndex = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
};

export const showCurrentQuestion = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionElement = createQuestionElement(currentQuestion);
  const questionContainer = getDOMElement(QUESTION_CONTAINER_ID);
  const button = getDOMElement(NEXT_QUESTION_BUTTON_ID);

  clearDOMElement(questionContainer);
  questionContainer.appendChild(questionElement);

  const timeCount = document.querySelector('.timer .timer_sec')
  startTimer(10, timeCount)
  button.removeEventListener('click', nextQuestion)
};

export const clearQuizContainer = () => {
  const quizContainer = getDOMElement(QUIZ_CONTAINER_ID);
  clearDOMElement(quizContainer);
};

export function handleSelectedAnswer(evt) {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const nextQuestionButton = getDOMElement(NEXT_QUESTION_BUTTON_ID);

  currentQuestion.selected = getKeyByValue(currentQuestion.answers, evt.target.textContent);
  endTimer();
  button.addEventListener('click', nextQuestion);
};

export function handleQuestionResult() {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  return checkAnswer(currentQuestion.selected, currentQuestion.correct);
};
