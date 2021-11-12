'use strict';

import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { nextQuestion, selectedAnswer } from '../listeners/questionListeners.js';
import { createDOMElement } from '../utils/DOMUtils.js';

/**
 * Create an Answer element
 */
export const createAnswerElement = (answerText) => {
  const answerElement = createDOMElement('li');
  answerElement.innerText = answerText;
  answerElement.addEventListener('click', selectedAnswer);
  return answerElement;
};
export const createLinkElement = (linkText) => {
  const linkElement = createDOMElement('a');
  linkElement.innerText = linkText;

  return linkElement;
};
/**
 * Create a full question element
 */
export const createQuestionElement = (question) => {
  // Create question container
  const container = createDOMElement('div');
  container.className = 'question';
  const title = createDOMElement('h1');
  title.innerText = question.text;
  container.appendChild(title);
  
  // Create answers container 
  const answerContainer = createDOMElement('ol');

  for (const answerKey in question.answers) {
    const answer = createAnswerElement(question.answers[answerKey]);
    answerContainer.appendChild(answer);
  }

  container.appendChild(answerContainer);

  // Create references container
  const referencesContainer = createDOMElement('div');
  referencesContainer.id = 'references-container';
  
  // Create references elements
  const learnMore = createDOMElement('p');
  learnMore.className = 'learn';
  learnMore.innerText = 'Learn more: ' 
  referencesContainer.appendChild(learnMore);

  question.links.forEach(link => {
    const theLink = createLinkElement(link.text);
    theLink.href = link.href;
    referencesContainer.appendChild(theLink);
  })
  container.appendChild(referencesContainer);
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
  buttonElement.addEventListener('click', nextQuestion);

  return buttonElement;
};
