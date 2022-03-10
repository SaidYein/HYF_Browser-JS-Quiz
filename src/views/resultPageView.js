'use strict';

import { FINISH_BUTTON_ID, RESULT_PAGE_ID } from '../constants.js';

import { createDOMElement } from '../utils/DOMUtils.js';
import { quizData } from '../data.js';

const createFinishButton = () => {
  const finishButton = createDOMElement('button', {
    id: FINISH_BUTTON_ID,
    content: 'Finish',
  });
  finishButton.addEventListener('click', () => location.reload());
  return finishButton;
};

export const createResultPage = () => {
  const finalScore = quizData.currentTotalScore;
  const resultPageContainer = createDOMElement('div', {
    id: RESULT_PAGE_ID,
    className: 'column',
  });

  const congratsMessage = createDOMElement('h1', {
    className: 'congrats-message',
  });
  if (finalScore >= 7) {
    congratsMessage.innerText = `Well Done ${quizData.userName} !!`;
  } else {
    congratsMessage.innerText = `Keep Learning ${quizData.userName} & Try Again!`;
  }
  const scoreMessage = createDOMElement('h2', {
    className: 'score-message',
    content: 'Your Score is',
  });

  const totalScoreElement = createDOMElement('h3', {
    className: 'total-score',
    content: finalScore,
  });

  const finishButton = createFinishButton();
  resultPageContainer.appendChild(congratsMessage);
  resultPageContainer.appendChild(scoreMessage);
  resultPageContainer.appendChild(totalScoreElement);
  resultPageContainer.appendChild(finishButton);

  return resultPageContainer;
};
