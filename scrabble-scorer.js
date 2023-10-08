// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += Number(pointValue);
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

word = input.question("Let's play some scrabble! Enter a word: ");

function initialPrompt() {
  // let word = input.question("Let's play some scrabble! Enter a word: ");
  return word;
}

let simpleScorer = function (word) {
  let letters = {
    1: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
  };

  word = word.toUpperCase();

  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in letters) {
      if (letters[pointValue].includes(word[i])) {
        letterPoints += Number(pointValue);
      }
    }
  }
  return letterPoints;
};

let vowelBonusScorer = function (word) {
  let letters = {
    1: [
      "B",
      "C",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "V",
      "W",
      "X",
      "Z",
    ],
    3: ["A", "E", "I", "O", "U", "Y"],
  };

  word = word.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in letters) {
      if (letters[pointValue].includes(word[i])) {
        letterPoints += Number(pointValue);
      }
    }
  }
  return letterPoints;
};

let scrabbleScorer = function (word) {
  let score = 0;
   
  for (let i = 0; i < word.length; i++) {
    const letter = word[i].toLowerCase();
    score += newPointStructure[letter] || 0;
  }
  return score;
};

const scoringAlgorithms = [
  (simpleScoring = {
    name: "Simple scoring:",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  }),
  (vowelBonus = {
    name: "Vowel Bonus:",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  }),
  (newPointSytem = {
    name: "Scrabble:",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer,
  }),
];

function scorerPrompt() {
  let response = input.question(
    `Which algorithm would you like to use? \n\n 0 - ${scoringAlgorithms[0].name} ${scoringAlgorithms[0].description} \n 1 - ${scoringAlgorithms[1].name} ${scoringAlgorithms[1].description}\n 2 - ${scoringAlgorithms[2].name} ${scoringAlgorithms[2].description}\n enter 0, 1, or 2: `
  );
  if (response === "0") {
    console.log(
      `\nscore for "${word}" is: ${scoringAlgorithms[0].scorerFunction(word)}`
    );
  } else if (response === "1") {
    console.log(
      `\nscore for "${word}" is: ${scoringAlgorithms[1].scorerFunction(word)}`
    );
  } else if (response === "2") {
    console.log(
      `\nscore for "${word}" is: ${scoringAlgorithms[2].scorerFunction(word)}`
    );
  }
}

function transform(obj) {
  const newPointStructure = {};
  for (scores in obj) {
    obj[scores].forEach((letter) => {
      newPointStructure[letter.toLowerCase()] = Number(scores);
    });
  }
  return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
