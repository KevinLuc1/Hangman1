document.addEventListener("DOMContentLoaded", function(event) {
    
  let incorrectLetterBox = [];
  let correctLetterBox = [];

  //dont rly need this
  let wordToGuess = [];

  let letters_in_array = [];


  let dashLines = [];

  let winCounter = 0;
  let lossCounter = 0;

  let guessCounter = 6;

  // this equals the length of word
  let numberToWin;
  // every time a correct is guessed, this goes up
  // game is won when guessedCorrect = numberToWin
  let guessedCorrect = 0;


  class Hangman {
    constructor(word) {
      this.word = word;
      this.letters = word.split(""); //returns an array of characters
      this.wordLength = word.length;
    }

    newGame(){
      console.log(this.word);
      // console.log(this.letters);
      console.log(this.wordLength);

      numberToWin = this.wordLength;

      //dont rly need this
      wordToGuess = this.word;
      letters_in_array = this.letters;

    
      console.log(letters_in_array)

      console.log(numberToWin)

     

      displayWord();
      
      // empties out the global variable dashLines
      dashLines = [];
      var temp = []
      // put a dash into the html for every letter in new word
      for (var i = 0; i < this.letters.length; i++){
        
        
        temp += "_ ";
        dashLines = temp.split(" ")
        
      }
      console.log(temp)

      console.log(dashLines);

      displayDashes();
    }
  }

  const words = [
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

  //vanilla js for listening to a click to start a new game
  [].forEach.call(document.querySelectorAll('.resetButton'), function(el) {
    el.addEventListener('click', function() {

      startNew();


    })
  });





  // displaying letters guessed
  [].forEach.call(document.querySelectorAll('.letter-button'), function(el) {
    el.addEventListener('click', function() {

      if (this.classList.contains('letter-button')) {
           this.classList.remove('letter-button');
           this.classList.add('letter-disabled');  
        }

      let letter = this.innerHTML;

      let indexOfLetter = []

      // find all index where this letter appears
      letters_in_array.forEach((e, i)=>{
        if(e === letter){
          indexOfLetter.push(i)
        }
      })
      console.log(indexOfLetter)

      //checking for duplicates in correct letter box
      if (correctLetterBox.includes(letter)){
        console.log("already in the correct letter box")
      }
      //if not already selected in correct letter box, add letter to box
      else if (letters_in_array.includes(letter)){
        correctLetterBox += letter;
        displayCorrectLetterBox();
      }
      // if not dup in correctbox or is not correct letter, 
      // check if dup in incorrect box, is true do nothing
      else if (incorrectLetterBox.includes(letter)) {
        console.log("already in the incorrect letter box")
      }
      // if no dup in incorrectbox, add letter and display
      // also drop guess count by 1
      else {
        incorrectLetterBox += letter;
        displayWrongLetterBox();
        guessCounter -= 1;
        displayGuessCounter();
        // if guess counter = 0, lose and restart game
        if (guessCounter === 0){
          lossCounter += 1;
          displayLossCounter();
          alert("Out of guesses, Game Over")
          startNew();
        }
      }


      // swaps the dash at the correct index
      for (var i = 0; i < indexOfLetter.length; i++){
        dashLines[indexOfLetter[i]] = letter
        displayDashes();

        //increment guessedCorrect, will keep adding due to loop
        guessedCorrect += 1;

        //we win here and restart game
        if (guessedCorrect === numberToWin) {
          winCounter +=1;
          displayWinCounter();
          alert("You have won!");
          startNew();
        }

      }


    });
  });

  startNew();
  displayWinCounter();
  displayLossCounter();
  displayGuessCounter();

  function displayWrongLetterBox(){
    document.querySelector('.guessedWrong').innerHTML = incorrectLetterBox;
  }

  function displayCorrectLetterBox(){
    document.querySelector('.guessedRight').innerHTML = correctLetterBox;
  }

  function displayDashes() {
    document.querySelector('.dashes').innerHTML = dashLines;
  }


  // dont rly need this
  function displayWord() {
    document.querySelector('.wordbox').innerHTML = wordToGuess.toUpperCase();
  }

  function displayWinCounter(){
    document.querySelector('.winCounter').innerHTML = winCounter;
  }

  function displayLossCounter(){
    document.querySelector('.lossCounter').innerHTML = lossCounter;
  }

  function displayGuessCounter(){
    document.querySelector('.guessCounter').innerHTML = guessCounter;
  }

  // start or restart a new game
  function startNew(){
      // generate a new random word
      let randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

      // calls the constructor Hangman and inputs newly generated word
      let play = new Hangman(randomWord);

      // calling the method newGame inside the constructor
      play.newGame();

      // empties out the global variable correct and incorrect letter boxes
      incorrectLetterBox = [];
      correctLetterBox = [];
      guessCounter = 6;

      //redisplaying the empty letter boxes
      displayWrongLetterBox();
      displayCorrectLetterBox();
      displayGuessCounter();

     
      let something = document.querySelector('#alphabet-keypad').children;
      
      // turns off opacity to all current buttons
      // by changing any class letter-disabled back to letter-button
      for (var i = 0; i < something.length; i++) {
        if (something[i].classList.contains('letter-disabled')) {
             something[i].classList.remove('letter-disabled');
             something[i].classList.add('letter-button');
            };
        // console.log(something[i].innerHTML)
      }
  }

});







