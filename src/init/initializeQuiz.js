'use strict';

import {
  // QUESTION_CONTAINER_ID,
  // QUIZ_CONTAINER_ID,
  USER_NAME_ID,
  START_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import {
  showCurrentQuestion,
  showCurrentScore,
  clearUserInterface,
} from '../handlers/questionHandlers.js';
import {
  // clearDOMElement,
  createDOMElement,
  getDOMElement,
} from '../utils/DOMUtils.js';
import {
  // createNextQuestionButtonElement,
  // createQuestionElement,
  // createStatusBarElement,
  // getCurrentQuestion,
  createQuizContainer
} from '../views/questionViews.js';
import { quizData } from '../data.js';
import { createStartPage } from '../views/startPageView.js';

const initializeQuiz = () => {
  quizData.currentQuestionIndex = 0;
  showTheStartPage();
};

const startTheQuiz = () => {
  clearUserInterface();
  setupQuizHTML();
  showCurrentQuestion();
  showCurrentScore();
};
const showTheStartPage = () => {
  // const userInterface = getDOMElement('user-interface');
  createStartPage();
  const startButton = getDOMElement(START_BUTTON_ID);
  startButton.addEventListener('click', () => {
    const userName = document.getElementById(USER_NAME_ID).value;
    if (userName) {
      quizData.userName = userName;
    } else {
      quizData.userName = 'GHOST';
    } 
    startTheQuiz();
  });
};

const setupQuizHTML = () => {
  const userInterfaceContainer = getDOMElement(USER_INTERFACE_ID);
  const teamsName = createDOMElement('h2', { className: 'teams-name' });

  teamsName.innerText = `ICONIC HORDE vs. ${quizData.userName}`;
  userInterfaceContainer.appendChild(teamsName);
  const quizContainer = createQuizContainer();
  console.log(quizContainer);
  userInterfaceContainer.appendChild(quizContainer);
};

window.addEventListener('load', initializeQuiz);
