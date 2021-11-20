'use strict';

import {
  showCurrentQuestion,
  incrementQuestionIndex,
  deleteQuestionCard,
  showCurrentScore,
  handleSelectedAnswer,
  showQuizResult,
  clearUserInterface,
} from '../handlers/questionHandlers.js';
import { createQuizHTML } from '../views/questionViews.js';

export const startTheQuiz = () => {
  clearUserInterface();
  createQuizHTML();
  showCurrentQuestion();
  showCurrentScore();
};

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
