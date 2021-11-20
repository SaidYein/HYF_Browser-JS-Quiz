'use strict';

import { quizData } from '../data.js';
import { createStartPage } from '../views/startPageView.js';

const initializeQuiz = () => {
  quizData.currentQuestionIndex = 0;
  createStartPage();
};

window.addEventListener('load', initializeQuiz);
