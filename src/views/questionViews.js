'use strict';

import {
  NEXT_QUESTION_BUTTON_ID,
  QUESTION_CONTAINER_ID,
  COUNTDOWN_ID,
  CURRENT_SCORE_ID,
  STATUS_BAR_ID,
  QUIZ_CONTAINER_ID
} from '../constants.js';
import {
  nextQuestion,
  selectedAnswer,
} from '../listeners/questionListeners.js';
import { createDOMElement } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';

/**
 * Create the answers choices parts
 */

//* Create the answers elements
export const createAnswerElement = (answerText) => {
  const answerElement = createDOMElement('li');
  answerElement.innerText = answerText;
  answerElement.addEventListener('click', selectedAnswer);
  return answerElement;
};

//* Create the answers' container
const createAnswersContainer = () => {
  const answerContainer = createDOMElement('ol', {
    className: 'answers-list',
  });
  return answerContainer;
};

/**
 * Create the references sections parts
 */

// Create a Reference Element
export const createReferenceElement = (linkData) => {
  const referenceElement = createDOMElement('a', { className: 'reference' });
  referenceElement.text = linkData.text;
  referenceElement.href = linkData.href;
  referenceElement.target = '_blank';
  return referenceElement;
};

// Create the reference container
const createReferencesContainer = () => {
  const referencesContainer = createDOMElement('div', {
    id: 'references-container',
  });
  const learnMore = createDOMElement('p', { className: 'learn' });
  learnMore.innerText = 'Learn more: ';
  referencesContainer.appendChild(learnMore);
  return referencesContainer;
};

/**
 *  Create the status bar's elements parts
 */
//* Create the current score element
export const createCurrentScoreElement = () => {
  const currentScoreContainer = createDOMElement('div', {
    className: 'circle',
  });
  const currentScore = createDOMElement('span', { id: CURRENT_SCORE_ID });
  currentScoreContainer.appendChild(currentScore);
  return currentScoreContainer;
};

//* Create the countdown element
export const createCountdownElement = () => {
  const countdownContainer = createDOMElement('div', { className: 'circle' });
  const countdown = createDOMElement('time', { id: COUNTDOWN_ID });
  countdownContainer.appendChild(countdown);
  return countdownContainer;
};

//* Create the status bar container
export const createStatusBarContainer = () => {
  const statusBar = createDOMElement('div', { id: STATUS_BAR_ID });
  const currentScore = createCurrentScoreElement();
  const countdown = createCountdownElement();
  statusBar.appendChild(currentScore);
  statusBar.appendChild(countdown);
  return statusBar;
};

// // Create the current score element

// export const createScoreElement = () => {
//   const quizStatusBar = createDOMElement('div', { className: 'quiz-status' });
//   const currentScore = createDOMElement('span', {
//     id: SCORE_SPAN_ID,
//     className: 'current-score',
//   });
//   quizStatusBar.appendChild(currentScore);
//   return quizStatusBar;
// };

/**
 * Create a full question element
 */

// Create Stackable Question Cards
export const createQuestionElement = () => {
  // const outerCardContainer = createDOMElement('div', {
  //   className: 'outer-container',
  // });
  // const innerCardContainer = createDOMElement('div', {
  //   className: 'inner-container',
  // });
  // outerCardContainer.appendChild(innerCardContainer);
  const questionsContainer = createDOMElement('div', {
    id: QUESTION_CONTAINER_ID,
  });
  const questions = quizData.questions;
  //* Create the Questions Card, Give the proper className & Translate
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
    const title = createDOMElement('h1', { className: 'question-text' });
    title.innerText = questions[i].text;
    cardContent.appendChild(title);

    const answerContainer = createAnswersContainer();

    for (const answerKey in questions[i].answers) {
      const answer = createAnswerElement(questions[i].answers[answerKey]);
      answerContainer.appendChild(answer);
    }

    cardContent.appendChild(answerContainer);

    // Adding The References

    const referencesContainer = createReferencesContainer();
    questions[i].links.forEach((questionLink) => {
      const link = createReferenceElement(questionLink);
      referencesContainer.appendChild(link);
    });

    cardContent.appendChild(referencesContainer);

    newCard.appendChild(cardContent);

    if (previousCard) {
      previousCard.appendChild(newCard);
    } else {
      questionsContainer.appendChild(newCard);
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

  return questionsContainer;
};

/**
 * Creates and returns the next questions button
 */
export const createNextQuestionButtonElement = () => {
  const buttonElement = createDOMElement('button', {
    id: NEXT_QUESTION_BUTTON_ID,
  });

  buttonElement.innerText = 'Next question';
  buttonElement.addEventListener('click', nextQuestion);
  return buttonElement;
};

/**
 * Create the quiz container
 */

export const createQuizContainer = () => {
  const quizContainer = createDOMElement('div', { id: QUIZ_CONTAINER_ID });
  const statusBar = createStatusBarContainer();
  quizContainer.appendChild(statusBar);
  const theQuestions = createQuestionElement();
  quizContainer.appendChild(theQuestions);

  console.log(quizContainer);
  return quizContainer;
};
