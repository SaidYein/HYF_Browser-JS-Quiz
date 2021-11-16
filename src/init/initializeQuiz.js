'use strict';

import { QUESTION_CONTAINER_ID, QUIZ_CONTAINER_ID, USER_NAME_ID } from '../constants.js';
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
  const welcomeMessage = createDOMElement('h1', { className: 'welcome-message' });
  welcomeMessage.innerText = 'Are You Up for a Challenge??';
  startPageContainer.appendChild(welcomeMessage);
  const userNameElement = createDOMElement('input', { id: USER_NAME_ID });
  userNameElement.setAttribute('type', 'text');
  userNameElement.placeholder = 'Type Your Name here..';
  startPageContainer.appendChild(userNameElement);
  const startTheQuizButton = createStartTheQuizButton();
  startPageContainer.appendChild(startTheQuizButton);
  userInterfaceContainer.appendChild(startPageContainer);

  const startTheQuiz = () => {
    setupQuizHTML();
    showCurrentQuestion();
    showCurrentScore();
    startPageContainer.style.visibility = "hidden";
    userInterfaceContainer.style.backgroundImage = 'none';
  }
  startTheQuizButton.addEventListener('click', startTheQuiz);
}

const setupQuizHTML = () => {
  const userInterfaceContainer = getDOMElement('user-interface');
  const quizContainer = createDOMElement('div', { id: QUIZ_CONTAINER_ID });
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const teamsName = createDOMElement('h2', { className: 'teams-name' });
  const userName = document.getElementById(USER_NAME_ID).value;
  quizData.userName = userName;
  teamsName.innerText = `Iconic Horde vs. ${quizData.userName}`;
  quizContainer.appendChild(teamsName);
  quizContainer.appendChild(createStatusBarElement(quizData.currentTotalScore, currentQuestion.time));
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
