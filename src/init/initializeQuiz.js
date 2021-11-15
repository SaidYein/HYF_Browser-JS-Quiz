'use strict';

import { QUESTION_CONTAINER_ID, QUIZ_CONTAINER_ID } from '../constants.js';
import { showCurrentQuestion, showCurrentScore } from '../handlers/questionHandlers.js';
import { clearDOMElement, createDOMElement, getDOMElement } from '../utils/DOMUtils.js';
import { createStartTheQuizButton, createNextQuestionButtonElement, createQuestionElement, createStatusBarElement } from '../views/questionViews.js';
import { quizData } from '../data.js';

const initializeQuiz = () => {
  quizData.currentQuestionIndex = 0;
  showTheStartPage();
};

const showTheStartPage = () => {
  const userInterfaceContainer = getDOMElement('user-interface');
  const startPageContainer = createDOMElement('div', { id: 'startPage' });
  const startTheQuizButton = createStartTheQuizButton();
  userInterfaceContainer.appendChild(startPageContainer);
  startPageContainer.appendChild(startTheQuizButton);

  const startTheQuiz = () => {
    setupQuizHTML();
    showCurrentQuestion();
    showCurrentScore();
    startTheQuizButton.style.visibility = "hidden";
  }
  startTheQuizButton.addEventListener('click', startTheQuiz);
}

const setupQuizHTML = () => {
  const userInterfaceContainer = getDOMElement('user-interface');
  const quizContainer = createDOMElement('div', { id: QUIZ_CONTAINER_ID });
  quizContainer.appendChild(createStatusBarElement(quizData.currentTotalScore));
  const questionContainer = createDOMElement('div', {
    id: QUESTION_CONTAINER_ID,
  });

  quizContainer.appendChild(questionContainer);

  const quizQuestions = createQuestionElement(quizData.questions);
  [...quizQuestions.children].forEach((question) => questionContainer.appendChild(question));

  const nextQuestionButton = createNextQuestionButtonElement();
  quizContainer.appendChild(nextQuestionButton);

  console.log(quizContainer);
  userInterfaceContainer.appendChild(quizContainer);
};


window.addEventListener('load', initializeQuiz);
