'use strict';

import {
  NEXT_QUESTION_BUTTON_ID,
  SCORE_SPAN_ID,
  TIMER_SPAN_ID,
  RESULT_CONTAINER_ID,
  USER_NAME_ID,
  START_BUTTON_ID
} from '../constants.js';
import {
  nextQuestion,
  selectedAnswer,
} from '../listeners/questionListeners.js';
import { createDOMElement, getDOMElement } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';

/**
 * Create the starting page elements
 */

 export const createStartTheQuizButton = () => {
  const startButton = createDOMElement('button', {
    id: START_BUTTON_ID,
    content: 'Start',
  });
  return startButton;
};

export const createStartPage = () => {
  const userInterface = getDOMElement('user-interface');
  userInterface.className = "flex column";
  const welcomeMessage = createDOMElement('h1', {
    className: 'welcome-message',
    content: 'Are You Up for a Challenge??',
  });
  userInterface.appendChild(welcomeMessage);

  const startPageContainer = createDOMElement('div', { id: 'start-page', className: 'column' });

  const userNameElement = createDOMElement('input', { id: USER_NAME_ID });
  userNameElement.setAttribute('type', 'text');
  userNameElement.placeholder = 'Type Your Name here..';
  startPageContainer.appendChild(userNameElement);
  const startTheQuizButton = createStartTheQuizButton();
  startPageContainer.appendChild(startTheQuizButton);
  userInterface.appendChild(startPageContainer);
};

/**
 * Create an Answer element
 */
export const createAnswerElement = (answerText) => {
  //- li should have class not id
  const answerElement = createDOMElement('li', {
    className: 'answer-ID',
    content: answerText,
  });
  answerElement.addEventListener('click', selectedAnswer);
  return answerElement;
};

// Create a Reference Element
export const createReferenceElement = (linkData) => {
  const referenceElement = createDOMElement('li');
  const referenceLink = createDOMElement('a', {
    className: 'current-reference',
  });
  referenceElement.appendChild(referenceLink);

  referenceLink.text = linkData.text;
  referenceLink.href = linkData.href;
  referenceLink.setAttribute('target', '_blank');

  return referenceElement;
};

// Create Status-Bar Element
export const createStatusBarElement = (currentTotalScore, timer) => {
  const quizStatusBar = createDOMElement('div', { className: 'quiz-status' });
  const currentScore = createDOMElement('span', {
    id: SCORE_SPAN_ID,
    className: 'current-score',
  });
  const currentTimer = createDOMElement('span', {
    id: TIMER_SPAN_ID,
    className: 'current-timer',
  });

  quizStatusBar.appendChild(currentScore);
  quizStatusBar.appendChild(currentTimer);

  currentScore.innerText = currentTotalScore;
  currentTimer.innerText = timer;

  return quizStatusBar;
};

// Create Stackable Question Cards
export const createQuestionElement = () => {
  const outerCardContainer = createDOMElement('div', {
    className: 'outer-container',
  });
  const innerCardContainer = createDOMElement('div', {
    className: 'inner-container',
  });
  outerCardContainer.appendChild(innerCardContainer);

  // Create the Questions Card, Give the proper className & Translate
  const numberOfCard = quizData.questions.length;
  let previousCard;
  for (let i = numberOfCard - 1; i >= 0; i--) {
    let newCard;
    let cardContent;
    const cardNumber = i + 1;

    newCard = createDOMElement('div', {
      className: `card card${cardNumber}`,
    });

    cardContent = createDOMElement('div', {
      className: 'card-content',
    });

    if (i !== 0) {
      newCard.classList.add('inactive');
    } else {
      newCard.classList.add('active');
      cardContent.classList.add('active');
    }

    // Creating Question Info
    const title = createDOMElement('h1');
    title.innerText = quizData.questions[i].text;
    cardContent.appendChild(title);

    const answerContainer = createDOMElement('ol', {
      className: 'answers-list',
    });

    for (const answerKey in quizData.questions[i].answers) {
      const answer = createAnswerElement(
        quizData.questions[i].answers[answerKey]
      );
      answerContainer.appendChild(answer);
    }

    cardContent.appendChild(answerContainer);

    // Adding The References
    const referenceContainer = createDOMElement('ul', {
      className: 'reference-container',
    });

    quizData.questions[i].links.forEach((questionLink) => {
      const link = createReferenceElement(questionLink);
      referenceContainer.appendChild(link);
    });

    cardContent.appendChild(referenceContainer);

    newCard.appendChild(cardContent);

    if (previousCard) {
      previousCard.appendChild(newCard);
    } else {
      innerCardContainer.appendChild(newCard);
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

  previousCard.appendChild(progressContainer);

  return outerCardContainer;
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
    congratsMessage.innerText = 'Well Done!';
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
