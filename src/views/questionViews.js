'use strict';

import {
  QUIZ_CONTAINER_ID,
  QUESTION_CONTAINER_ID,
  NEXT_QUESTION_BUTTON_ID,
  SCORE_SPAN_ID,
  TIMER_SPAN_ID,
  USER_INTERFACE_ID,
  REFERENCES_CONTAINER_ID
} from '../constants.js';
import { createDOMElement, getDOMElement } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';

/**
 * Create an Answer section
 */

const createAnswersContainer = () => {
  const answerContainer = createDOMElement('ol', { className: 'answers-list' });
  return answerContainer;
};
export const createAnswerElement = (answerText) => {
  const answerElement = createDOMElement('li', {
    content: answerText,
  });
  return answerElement;
};
/**
 * Create references elements
 */
const createReferencesContainer = () => {
  const referencesContainer = createDOMElement('div', {
    id: REFERENCES_CONTAINER_ID,
  });
  const learnMore = createDOMElement('p', {
    className: 'learn',
    content: 'Learn more: ',
  });
  learnMore.innerText = 'Learn more: ';
  referencesContainer.appendChild(learnMore);
  return referencesContainer;
};
const createLinkElement = (linkData) => {
  const linkElement = createDOMElement('a', {
    className: 'reference',
    content: linkData,
  });
  linkElement.innerText = linkData;
  return linkElement;
};
/**
 * Create status side bar
 */
const createStatusBarElement = () => {
  const quizStatusBar = createDOMElement('div', {
    className: 'quiz-status column',
  });
  const currentScore = createDOMElement('span', {
    id: SCORE_SPAN_ID,
    className: 'current-score status',
  });
  const currentTimer = createDOMElement('span', {
    id: TIMER_SPAN_ID,
    className: 'current-timer status',
  });
  const nextQuestionButton = createNextQuestionButtonElement();

  quizStatusBar.appendChild(currentScore);
  quizStatusBar.appendChild(currentTimer);
  quizStatusBar.appendChild(nextQuestionButton);
  return quizStatusBar;
};
export const getCurrentQuestion = () => {
  return quizData.questions[quizData.currentQuestionIndex];
};

/**
 * Create question element with all contents
 */
export const createQuestionElement = () => {
  const questionsContainer = createDOMElement('div', {
    id: QUESTION_CONTAINER_ID,
    className: 'column',
  });
  const stackCards = createDOMElement('div', { id: 'stack-cards' });

  // Create the Questions Card, Give the proper className & Translate
  const numberOfCard = quizData.questions.length;
  let previousCard;
  for (let i = numberOfCard - 1; i >= 0; i--) {
    let newCard;
    let cardContent;
    const cardNumber = i + 1;
    const question = quizData.questions[i];

    newCard = createDOMElement('div', {
      className: `card card${cardNumber}`,
    });

    cardContent = createDOMElement('div', {
      className: 'card-content column',
    });

    if (i !== 0) {
      newCard.classList.add('inactive');
    } else {
      newCard.classList.add('active');
      cardContent.classList.add('active');
    }

    // Creating Question Info
    const title = createDOMElement('h1', {
      className: 'title',
      content: question.text,
    });
    cardContent.appendChild(title);

    const answerContainer = createAnswersContainer();

    for (const answerKey in question.answers) {
      const answer = createAnswerElement(question.answers[answerKey]);
      answer.className = `answer${i}`;
      answerContainer.appendChild(answer);
    }

    cardContent.appendChild(answerContainer);

    // Adding The References
    const referencesContainer = createReferencesContainer();
    question.links.forEach((link) => {
      const theLink = createLinkElement(link.text);
      theLink.href = link.href;
      theLink.target = '_blank';
      referencesContainer.appendChild(theLink);
    });

    cardContent.appendChild(referencesContainer);

    newCard.appendChild(cardContent);

    if (previousCard) {
      previousCard.appendChild(newCard);
    } else {
      stackCards.appendChild(newCard);
    }

    previousCard = newCard;
  }

  questionsContainer.appendChild(stackCards);
  return questionsContainer;
};

/**
 * Create progress element
 */
const createProgressContainer = () => {
  const progressContainer = createDOMElement('div', {
    className: 'progress-container',
  });
  const step = createDOMElement('div', {
    id: 'step',
  });

  progressContainer.appendChild(step);
  return progressContainer;
};

/**
 * Create quiz element
 */
export const createQuizContainer = () => {
  const quizContainer = createDOMElement('div', {
    id: QUIZ_CONTAINER_ID,
    className: '',
  });
  const questionElement = createQuestionElement();
  const progressContainer = createProgressContainer();
  const statusBar = createStatusBarElement();
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(progressContainer);
  quizContainer.appendChild(statusBar);
  return quizContainer;
};

/**
 * Creates and returns the next questions button
 */
export const createNextQuestionButtonElement = () => {
  const buttonElement = createDOMElement('button', {
    id: NEXT_QUESTION_BUTTON_ID,
    content: 'Next Question',
  });
  return buttonElement;
};

/**
 * Creates quiz HTML element
 */

export const createQuizHTML = () => {
  const userInterfaceContainer = getDOMElement(USER_INTERFACE_ID);
  const teamsName = createDOMElement('h2', { className: 'teams-name' });

  teamsName.innerText = `ICONIC HORDE vs. ${quizData.userName}`;
  userInterfaceContainer.appendChild(teamsName);
  const quizContainer = createQuizContainer();
  userInterfaceContainer.appendChild(quizContainer);
};
