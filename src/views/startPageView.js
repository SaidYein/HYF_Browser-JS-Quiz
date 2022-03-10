'use strict';

import {
  USER_INTERFACE_ID,
  USER_NAME_ID,
  START_BUTTON_ID,
  START_PAGE_ID,
} from '../constants.js';

import { createDOMElement, getDOMElement } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';
import { startTheQuiz } from '../listeners/questionListeners.js';

const createStartTheQuizButton = () => {
  const startButton = createDOMElement('button', {
    id: START_BUTTON_ID,
    content: 'Start',
    type: 'button',
  });
  startButton.addEventListener('click', () => {
    const userName = document.getElementById(USER_NAME_ID).value;
    if (userName) {
      quizData.userName = userName.toUpperCase();
    } else {
      quizData.userName = 'GHOST';
    }
    startTheQuiz();
  });
  return startButton;
};

export const createStartPage = () => {
  const userInterface = getDOMElement(USER_INTERFACE_ID);
  userInterface.className = 'flex-center column';
  const welcomeMessage = createDOMElement('h1', {
    className: 'welcome-message',
    content: 'Are You Up for a Challenge??',
  });
  userInterface.appendChild(welcomeMessage);

  const startPageContainer = createDOMElement('div', {
    id: START_PAGE_ID,
    className: 'column',
  });

  const userNameElement = createDOMElement('input', { id: USER_NAME_ID });
  userNameElement.setAttribute('type', 'text');
  userNameElement.setAttribute('autofocus', 'autofocus');
  userNameElement.setAttribute('autocomplete', 'off');
  userNameElement.placeholder = 'Type Your Name here..';
  userNameElement.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
      const userName = document.getElementById(USER_NAME_ID).value;
      if (userName) {
        quizData.userName = userName.toUpperCase();
      } else {
        quizData.userName = 'GHOST';
      }
      startTheQuiz();
    }
  });
  startPageContainer.appendChild(userNameElement);
  const startTheQuizButton = createStartTheQuizButton();
  startPageContainer.appendChild(startTheQuizButton);
  userInterface.appendChild(startPageContainer);
};
