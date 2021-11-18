'use strict';

import {
  showCurrentQuestion,
  incrementQuestionIndex,
  deleteQuestionCard,
  showCurrentScore,
  handleSelectedAnswer,
  showQuizResult,
} from '../handlers/questionHandlers.js';

export const nextQuestion = () => {
  incrementQuestionIndex();
  showCurrentQuestion();
  deleteQuestionCard();
  showCurrentScore();
};

export const selectedAnswer = (e) => {
  handleSelectedAnswer(e);
};

export const showResult = () => {
  showQuizResult();
};
