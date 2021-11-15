'use strict';

import {
  showCurrentQuestion,
  incrementQuestionIndex,
  deleteQuestionCard,
  showCurrentScore,
  clearQuizContainer,
  handleSelectedAnswer,
  handleQuestionResult,
} from '../handlers/questionHandlers.js';

export const nextQuestion = () => {
  incrementQuestionIndex();
  showCurrentQuestion();
  deleteQuestionCard();
  showCurrentScore();
};

export const selectedAnswer = (e) => {
  handleSelectedAnswer(e);
  handleQuestionResult();
};
