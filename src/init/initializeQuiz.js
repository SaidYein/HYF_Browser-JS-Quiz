'use strict';

import {
  QUESTION_CONTAINER_ID,
  QUIZ_CONTAINER_ID,
  USER_NAME_ID,
  START_BUTTON_ID,
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
  createStartPage,
} from '../views/questionViews.js';
import { quizData } from '../data.js';

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
  // userInterface.appendChild(startPage);
  // const startTheQuiz = () => {
  //   setupQuizHTML();
  //   showCurrentQuestion();
  //   showCurrentScore();
  //   clearUserInterface();
  // //   // userInterfaceContainer.style.backgroundImage = 'none';
  // }
  // const startButton = getDOMElement('start-quiz');
  // startButton.addEventListener('click', startTheQuiz);
  // return userInterfaceContainer;
};

const setupQuizHTML = () => {
  const userInterfaceContainer = getDOMElement('user-interface');
  const quizContainer = createDOMElement('div', { id: QUIZ_CONTAINER_ID });
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
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
