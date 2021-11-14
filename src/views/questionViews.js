'use strict';

import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { nextQuestion, selectedAnswer } from '../listeners/questionListeners.js';
import { createDOMElement } from '../utils/DOMUtils.js';
import { SCORE_SPAN_ID } from '../constants.js';

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
  const referenceLink = createDOMElement('a');
  referenceElement.appendChild(referenceLink);

  referenceLink.text = linkData.text;
  referenceLink.href = linkData.href;
  return referenceElement;
};

// Create UpToDate Score Element
export const createScoreElement = (currentTotalScore) => {
  const quizStatusBar = createDOMElement('div', { className: 'quiz-status' });
  const currentScore = createDOMElement('span', { id: SCORE_SPAN_ID, className: 'current-score' });
  quizStatusBar.appendChild(currentScore);
  currentScore.innerText = currentTotalScore;
  return quizStatusBar;
};

/**
 * Create a full question element
 */
export const createQuestionElement = (question) => {
  const container = createDOMElement('div');
  const title = createDOMElement('h1');
  title.innerText = question.text;
  container.appendChild(title);

  const answerContainer = createDOMElement('ol');

  for (const answerKey in question.answers) {
    const answer = createAnswerElement(question.answers[answerKey]);
    answerContainer.appendChild(answer);
  }

  container.appendChild(answerContainer);

  const referenceContainer = createDOMElement('ul');

  question.links.forEach((questionLink) => {
    const link = createReferenceElement(questionLink);
    referenceContainer.appendChild(link);
  })

  container.appendChild(referenceContainer);

  return container;
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
