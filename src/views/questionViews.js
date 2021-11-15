'use strict';

import { NEXT_QUESTION_BUTTON_ID, SCORE_SPAN_ID, TIMER_SPAN_ID } from '../constants.js';
import { nextQuestion, selectedAnswer } from '../listeners/questionListeners.js';
import { createDOMElement } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';

// Create the Starting Page
export const createStartTheQuizButton = () => {
  const startButton = createDOMElement('button');
  startButton.innerText = 'Start The Quiz';

  return startButton;
};

/**
 * Create an Answer element
 */
export const createAnswerElement = (answerText) => {
  const answerElement = createDOMElement('li');
  answerElement.innerText = answerText;
  answerElement.addEventListener('click', selectedAnswer);
  return answerElement;
};

// Create a Reference Element
export const createReferenceElement = (linkData) => {
  const referenceElement = createDOMElement('li');
  const referenceLink = createDOMElement('a', { className: 'current-reference' });
  referenceElement.appendChild(referenceLink);

  referenceLink.text = linkData.text;
  referenceLink.href = linkData.href;
  referenceLink.setAttribute('target', '_blank');

  return referenceElement;
};

// Create Status-Bar Element
export const createStatusBarElement = (currentTotalScore) => {
  const quizStatusBar = createDOMElement('div', { className: 'quiz-status' });
  const currentScore = createDOMElement('span', { id: SCORE_SPAN_ID, className: 'current-score' });
  const currentTimer = createDOMElement('span', { id: TIMER_SPAN_ID, className: 'current-timer' });

  quizStatusBar.appendChild(currentScore);
  quizStatusBar.appendChild(currentTimer);

  currentScore.innerText = currentTotalScore;

  return quizStatusBar;
};

// Create Stackable Question Cards
export const createQuestionElement = () => {
  const outerCardContainer = createDOMElement('div', { className: 'outer-container' });
  const innerCardContainer = createDOMElement('div', { className: 'inner-container' });
  outerCardContainer.appendChild(innerCardContainer);

  // Create the Questions Card, Give the proper className & Translate
  const numberOfCard = quizData.questions.length;
  let previousCard = undefined;
  for (let i = numberOfCard - 1; i >= 0; i--) {
    let newCard = undefined;
    let cardContent = undefined;
    const cardNumber = i + 1;

    newCard = createDOMElement('div', {
      className: `card card${cardNumber}`
    });

    cardContent = createDOMElement('div', {
      className: 'card-content'
    });

    if (i !== 0) {
      newCard.classList.add("inactive");
    } else {
      newCard.classList.add("active");
      cardContent.classList.add("active");
    }

    // Creating Question Info
    const title = createDOMElement('h1');
    title.innerText = quizData.questions[i].text;
    cardContent.appendChild(title);

    const answerContainer = createDOMElement('ol');

    for (const answerKey in quizData.questions[i].answers) {
      const answer = createAnswerElement(quizData.questions[i].answers[answerKey]);
      answerContainer.appendChild(answer);
    }

    cardContent.appendChild(answerContainer);

    // Adding The References
    const referenceContainer = createDOMElement('ul', { className: 'reference-container' });

    quizData.questions[i].links.forEach((questionLink) => {
      const link = createReferenceElement(questionLink);
      referenceContainer.appendChild(link);
    })

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
    className: 'progress-container'
  });
  const step = createDOMElement('div', {
    id: 'step'
  });

  progressContainer.appendChild(step);

  previousCard.appendChild(progressContainer);

  return outerCardContainer;
};

/**
 * Creates and returns the next questions button
 */
export const createNextQuestionButtonElement = () => {
  const buttonElement = createDOMElement('button', {
    id: NEXT_QUESTION_BUTTON_ID,
  });

  buttonElement.innerText = 'Next question';

  return buttonElement;
};