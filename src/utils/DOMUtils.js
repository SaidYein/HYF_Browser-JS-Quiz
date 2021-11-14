'use strict';

/**
 * This function removes all the html inside the given element
 */
export const clearDOMElement = (DOMElement) => {
  DOMElement.innerHTML = '';
};

/**
 * This function creates a DOM element with the given tag.
 * In the options parameter it is possible to add some extra data to it:
 *
 *  id - the id of the element
 */
export const createDOMElement = (tag, options) => {
  const { id, className } = options || {};

  const element = document.createElement(tag);

  if (id != null) {
    element.id = id;
  }
  if (className != null) {
    element.className = className;
  }

  return element;
};

/**
 * Find and return a DOM element by its id
 */
export const getDOMElement = (id) => {
  return document.getElementById(id);
};

/*
*Get a key from objects. Used for getting the option when the answer selected
*/
export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}

// Checking if the User Answer is Correct or Not
export const checkAnswer = (selectedAnswer, correctAnswer) => selectedAnswer === correctAnswer;
