'use strict';

import {
  QUIZ_CONTAINER_ID,
  QUESTION_CONTAINER_ID,
  NEXT_QUESTION_BUTTON_ID,
  SCORE_SPAN_ID,
  TIMER_SPAN_ID,
  RESULT_CONTAINER_ID,
  USER_INTERFACE_ID,
  USER_NAME_ID,
  START_BUTTON_ID,
} from '../constants.js';
import {
  nextQuestion,
  selectedAnswer,
} from '../listeners/questionListeners.js';
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
  //- li should have class not id
  const answerElement = createDOMElement('li', {
    className: 'answer-ID',
    content: answerText,
  });
  answerElement.addEventListener('click', selectedAnswer);
  return answerElement;
};
/**
 * Create references elements
 */
const createReferencesContainer = () => {
  const referencesContainer = createDOMElement('div', {
    id: 'references-container',
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

  const progressContainer = createDOMElement('div', {
    className: 'progress-container',
  });
  const step = createDOMElement('div', {
    id: 'step',
  });

  progressContainer.appendChild(step);
  questionsContainer.appendChild(stackCards);
  questionsContainer.appendChild(progressContainer);

  return questionsContainer;
};

export const createQuizContainer = () => {
  const quizContainer = createDOMElement('div', {
    id: QUIZ_CONTAINER_ID,
    className: '',
  });
  const questionElement = createQuestionElement();
  const statusBar = createStatusBarElement();
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(statusBar);
  return quizContainer;
};
// Create Result Container
export const createResultContainerElement = () => {
  const resultContainer = createDOMElement('div', { id: RESULT_CONTAINER_ID });

  let congratsMessage = createDOMElement('h2', {
    className: 'congrats-message',
  });
  const scoreMessage = createDOMElement('h3', { className: 'score-message' });
  const totalScore = createDOMElement('h1', { className: 'total-score' });

  totalScore.innerText = quizData.currentTotalScore;
  if (totalScore >= '7') {
    congratsMessage.innerText = `Well Done ${quizData.userName} !!`;
  } else {
    congratsMessage.innerText = 'Keep Learning & Try Again!';
  }
  scoreMessage.innerText = 'Your Score is';

  resultContainer.appendChild(congratsMessage);
  resultContainer.appendChild(scoreMessage);
  resultContainer.appendChild(totalScore);

  return resultContainer;
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
  console.log(quizContainer);
  userInterfaceContainer.appendChild(quizContainer);
};
