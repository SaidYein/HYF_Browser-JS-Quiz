'use strict';

/* Program Data

  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!

  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/

export const quizData = {
  currentQuestionIndex: 0,
  currentTotalScore: 0,
  userName: 'Ghost',
  isAnswered: false,
  time: 30,
  counter: '',
  // the questions in the quiz
  questions: [
    {
      text: 'What are the different ways to declare a JS variable?',
      answers: {
        a: 'constant, let, variable',
        b: 'var, const, let, function',
        c: 'var, let, const',
        d: 'None of the above',
      },
      correct: 'c',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/variables',
        },
        {
          text: 'Tyler McGinnis',
          href: 'https://ui.dev/var-let-const/',
        },
      ],
    },
    {
      text: 'What does `typeof` do?',
      answers: {
        a: 'Changes the type of a primitive value',
        b: 'Can tell the difference between arrays and objects',
        c: 'Determines if a value is primitive',
        d: 'Returns a string describing the type of a value',
      },
      correct: 'd',
      selected: null,
      links: [
        {
          text: 'javascript.info',
          href: 'https://javascript.info/types#type-typeof',
        },
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
        },
      ],
    },
    // Add more questions here
    {
      text: 'Where is the correct place to insert a JavaScript?',
      answers: {
        a: 'The <body> section',
        b: 'The <head> section',
        c: 'Both <head> and <body> sections',
        d: 'None of the above',
      },
      correct: 'c',
      selected: null,
      links: [
        {
          text: 'w3schools',
          href:
            'https://www.w3schools.com/js/js_whereto.asp#:~:text=In%20HTML%2C%20JavaScript%20code%20is,and%20tags',
        },
      ],
    },
    {
      text: 'What will the following code `Boolean(10 > 9)` return?',
      answers: {
        a: 'false',
        b: 'true',
        c: 'NaN',
        d: 'undefined',
      },
      correct: 'b',
      selected: null,
      links: [
        {
          text: 'w3schools',
          href: 'https://www.w3schools.com/js/js_booleans.asp',
        },
      ],
    },
    {
      text: `How to insert a comment that has more than one line?`,
      answers: {
        a: '/*This is a comment */',
        b: '<!--This is a comment-->',
        c: '//This is a comment//',
        d: 'Both a & c',
      },
      correct: 'a',
      selected: null,
      links: [
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById',
        },
        {
          text: 'w3schools',
          href: 'https://www.w3schools.com/js/js_htmldom_html.asp',
        },
      ],
    },
    {
      text: `How can you detect the client's browser name?`,
      answers: {
        a: 'browser.name',
        b: 'navigator.userAgent',
        c: 'navigator.appName',
        d: 'Both b & c are correct',
      },
      correct: 'd',
      selected: null,
      links: [
        {
          text: 'codepedia.info',
          href: 'https://codepedia.info/detect-browser-in-javascript',
        },
        {
          text: 'javascripter',
          href: 'http://www.javascripter.net/faq/browsern.htm',
        },
      ],
    },
    {
      text: `Which method could append items to an array without changing the array itself?`,
      answers: {
        a: 'push',
        b: 'splice',
        c: 'concat',
        d: 'length',
      },
      correct: 'c',
      selected: null,
      links: [
        {
          text: 'samanthaming',
          href:
            'https://www.samanthaming.com/tidbits/87-5-ways-to-append-item-to-array/',
        },
      ],
    },
    {
      text: `Which declaration keyword can not have a block scope?`,
      answers: {
        a: 'var',
        b: 'let',
        c: 'const',
        d: 'None of the above',
      },
      correct: 'a',
      selected: null,
      links: [
        {
          text: 'w3schools',
          href: 'https://www.w3schools.com/js/js_scope.asp',
        },
      ],
    },
    {
      text: `What is the correct syntax for referring to an external script called "xxx.js"?`,
      answers: {
        a: '<script name="xxx.js">',
        b: '<script href="xxx.js">',
        c: '<script src="xxx.js">',
        d: 'Both a & c',
      },
      correct: 'c',
      selected: null,
      links: [
        {
          text: 'w3schools',
          href: 'https://www.w3schools.com/tags/att_script_src.asp',
        },
        {
          text: 'w3schools',
          href: 'https://www.w3schools.com/js/js_whereto.asp',
        },
      ],
    },
    {
      text: `How do you round the number 7.25 to the nearest integer?`,
      answers: {
        a: 'round(7.25)',
        b: 'Math.round(7.25)',
        c: 'Math.rnd(7.25)',
        d: 'rnd(7.25)',
      },
      correct: 'b',
      selected: null,
      links: [
        {
          text: 'MDN',
          href:
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round',
        },
        {
          text: 'w3schools',
          href: 'https://www.w3schools.com/jsref/jsref_round.asp',
        },
      ],
    },
  ],
};

export const animationData = {
  i: 0,
  step: 100,
  layer: 10,
};
