'use strict';

import {
  showCurrentQuestion,
  incrementQuestionIndex,
  showCurrentScore,
  clearQuizContainer,
  handleSelectedAnswer,
  handleQuestionResult,
  deleteQuestionCard
} from '../handlers/questionHandlers.js';

export const nextQuestion = () => {
  incrementQuestionIndex();
  showCurrentQuestion();
  showCurrentScore();
  deleteQuestionCard();
};

export const selectedAnswer = (e) => {
  handleSelectedAnswer(e);
  handleQuestionResult();
};
