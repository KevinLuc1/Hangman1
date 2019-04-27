document.addEventListener("DOMContentLoaded", function(event) {
    
var letterbox = [];

// var wordToGuess = [];

// var elem = document.querySelector('#some-elem');

class Hangman {
  constructor(word) {
    this.word = word;
    this.letters = word.split(""); //returns an array of characters
    this.wordLength = word.length;
  }

  newGame(){
    console.log(this.word);
    console.log(this.letters);
    console.log(this.wordLength);
    var wordToGuess = document.querySelector('.wordbox').innerHTML = this.word;
  
    }
}

class Guess extends Hangman {
  constructor(word, guess) {
    super(word);
    this.guess = guess;
    this.wrongLetter = [];
    this.rightLetter = [];
  }

  displayGuess(){
    console.log(this.word)
  }
}




let words = [
  "alligator", "aardvark", "anteater", "ape", "armadillo", 
  "bat", "bee", "badger", "bear", "beaver", 
  "beetle", "bird", "bumblebee", "buffalo", "butterfly",
  "camel", "cat", "cheetah", "chicken", "chimpanzee",
  "cockroach", "crocodile", "crow", "dolphin", "deer",
  "duck", "donkey", "dove", "dinosaur", "dragon",
  "eagle", "elephant", "elk", "emu", "falcon", 
  "flamingo", "ferret", "fish", "gecko", "gerbil",
  "giraffe", "gorilla", "goat", "grasshopper", "goose", 
  "hamster", "horse", "hippopotamus", "hummingbird", "hyena",
  "impala", "iguana", "jackal", "jaguar", "jellyfish",
  "kangaroo", "koala", "leopard", "labrador", "lemur",
  "llama", "lynx", "lobster", "ladybug", "magpie", 
  "manatee", "meerkat", "millipede", "mongoose", "mouse", 
  "monkey", "newt", "nightingale", "octupus", "otter",
  "oyster", "ostrich", "parrot", "panther", "peacock",
  "piranha", "platypus", "penguin", "porcupine", "puffin",
  "quail", "raccoon", "rabbit", "rhinoceros", "rottweiler", 
  "salamander", "scorpian", "seahorse", "spider", "squirrel",
  "stringray", "tortoise", "toucan", "turkey", "termite", 
  "vulture", "wallaby", "warthog", "whale", "wombat", 
  "woodpecker", "zebra"
];
// let randomWord = words[Math.floor(Math.random() * words.length)];
// let play = new Hangman(randomWord);

// play.newGame();

// var wordToGuess = [];

//vanilla js for listening to a click to start a new game
[].forEach.call(document.querySelectorAll('.resetButton'), function(el) {
  el.addEventListener('click', function() {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let play = new Hangman(randomWord);
    play.newGame();
    // var wordToGuess = document.querySelector('.wordbox');
    // wordToGuess.innerHTML = "hello";
    // console.log("played new game")
    letterbox = [];
    // document.querySelector('.guessedWrong').innerHTML = letterbox;
    displayWrongLetterBox();
  })
});

function displayWrongLetterBox(){
  document.querySelector('.guessedWrong').innerHTML = letterbox;
}





// displaying letters guessed
[].forEach.call(document.querySelectorAll('.letter-button'), function(el) {
  el.addEventListener('click', function() {


    var letter = this.innerHTML;
    console.log(letter)
    console.log(this)

    // for (var i = 0; i < letterbox.length; i++) {
    //     console.log(letterbox[i]); // index
    // };

    if (letterbox.indexOf(letter) === -1) {
      console.log("element doesn't exist");
      letterbox += letter;

      displayWrongLetterBox();

      // change class to letter-disabled to add opacity
      if (this.classList.contains('letter-button')) {
         this.classList.remove('letter-button');
         this.classList.add('letter-disabled');
        }


    }
    else {
      console.log("element already exists");
    }


  })
});


});



