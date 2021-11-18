'use strict';

import {
  QUESTION_CONTAINER_ID,
  QUIZ_CONTAINER_ID,
  USER_NAME_ID,
  START_BUTTON_ID,
  USER_INTERFACE_ID
} from '../constants.js';
import {
  showCurrentQuestion,
  showCurrentScore,
  clearUserInterface,
} from '../handlers/questionHandlers.js';
import {
  clearDOMElement,
  createDOMElement,
  getDOMElement,
} from '../utils/DOMUtils.js';
import {
  createStartTheQuizButton,
  createNextQuestionButtonElement,
  createQuestionElement,
  createStatusBarElement,
  getCurrentQuestion,
} from '../views/questionViews.js';
import { quizData } from '../data.js';
import { createStartPage } from '../views/startPageView.js';
const initializeQuiz = () => {
  // quizData.questions.sort();
  quizData.currentQuestionIndex = 0;
  showTheStartPage();
};

const startTheQuiz = () => {
  clearUserInterface();
  setupQuizHTML();
  showCurrentQuestion();
  showCurrentScore();

  //   // userInterfaceContainer.style.backgroundImage = 'none';
};
const showTheStartPage = () => {
  // const userInterface = getDOMElement('user-interface');
  createStartPage();
  const startButton = getDOMElement(START_BUTTON_ID);
  startButton.addEventListener('click', () => {
    const userName = document.getElementById(USER_NAME_ID).value;
    quizData.userName = userName;
    startTheQuiz();
  });
};

const setupQuizHTML = () => {
  const userInterfaceContainer = getDOMElement(USER_INTERFACE_ID);
  const quizContainer = createDOMElement('div', { id: QUIZ_CONTAINER_ID });
  const currentQuestion = getCurrentQuestion();
  const teamsName = createDOMElement('h2', { className: 'teams-name' });
  // const userName = document.getElementById(USER_NAME_ID).value;
  // quizData.userName = userName;
  teamsName.innerText = `Iconic Horde vs. ${quizData.userName}`;
  quizContainer.appendChild(teamsName);
  quizContainer.appendChild(
    createStatusBarElement(quizData.currentTotalScore, currentQuestion.time)
  );
  const questionContainer = createDOMElement('div', {
    id: QUESTION_CONTAINER_ID,
  });

  quizContainer.appendChild(questionContainer);

  const quizQuestions = createQuestionElement(quizData.questions);
  [...quizQuestions.children].forEach((question) =>
    questionContainer.appendChild(question)
  );

  const nextQuestionButton = createNextQuestionButtonElement();
  quizContainer.appendChild(nextQuestionButton);

  console.log(quizContainer);
  userInterfaceContainer.appendChild(quizContainer);
};

window.addEventListener('load', initializeQuiz);
