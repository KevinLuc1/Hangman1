document.addEventListener("DOMContentLoaded", function(event) {
    
  let incorrectLetterBox = [];
  let correctLetterBox = [];
  let letters_in_array = [];
  let dashLines = [];
  let winCounter = 0;
  let lossCounter = 0;
  let guessCounter = 8;

  let noDash = ""

  // this equals the length of word
  let numberToWin;
  // every time a correct is guessed, this goes up
  // game is won when guessedCorrect = numberToWin
  let guessedCorrect = 0;

  let word;


  class Hangman {
    constructor(word) {
      this.word = word;
      this.letters = word.split(""); //returns an array of characters
      this.wordLength = word.length;
    }

    newGame(){
      word = this.word;
      numberToWin = this.wordLength;

    

      letters_in_array = this.letters;

      
      // empties out the global variable dashLines
      dashLines = [];
      var temp = [];
      // put a dash into the html for every letter in new word
      for (var i = 0; i < this.letters.length; i++){
        
        
        temp += "_ ";
        
      }

      // we need to split the dashes from string into an array
      // because we need to replace the index of a dash later
      dashLines = temp.split(" ")

      //joining it back so we can display a string and not an array into the html
      noDash = dashLines.join(" ")

      //sends the currently blank string into the html
      displayNoDashes();

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
           this.setAttribute("disabled", "disabled")
        }


      let letter = this.innerHTML;

      let indexOfLetter = []

      // find all index where this letter appears
      letters_in_array.forEach((e, i)=>{
        if(e === letter){
          indexOfLetter.push(i)
        }
      })
      // console.log(indexOfLetter)

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
        guessCounter -= 1;
        displayWrongLetterBox();
        displayGuessCounter();
        insertNextPhoto();


        // if guess counter = 0, lose 

        weLost();

      }


      // swaps the dash at the correct index
      for (var i = 0; i < indexOfLetter.length; i++){
        dashLines[indexOfLetter[i]] = letter
        // displayDashes();
        noDash = dashLines.join(" ")
        displayNoDashes();


        //increment guessedCorrect, will keep adding due to loop
        guessedCorrect += 1;


      }
        //we win here and restart game
        if (guessedCorrect === numberToWin) {
          winCounter +=1;
          displayWinCounter();
          document.querySelector('.textBox').innerHTML = "Good job!";

          disableAllButtons();
        }


    });
  });

  startNew();
  displayWinCounter();
  displayLossCounter();
  displayGuessCounter();
  insertNextPhoto();

  function displayWrongLetterBox(){
    document.querySelector('.guessedWrong').innerHTML = incorrectLetterBox;
  }

  function displayCorrectLetterBox(){
    document.querySelector('.guessedRight').innerHTML = correctLetterBox;
  }


  function displayNoDashes() {
    document.querySelector('.dashes').innerHTML = noDash;
  }


  function insertNextPhoto(){

    
    // template literals
    // display the image currently tied to guessCounter
    document.querySelector('.hangmanImage').src=`images/hangman${guessCounter}.png`
    

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

  function disableAllButtons() {
    for (var i = 0; i < 18; i++){
            var hello = document.querySelector('.letter-button');
               hello.classList.remove('letter-button');
               hello.classList.add('letter-disabled'); 
               hello.setAttribute("disabled", "disabled")
          }
  }

  function enableAllButtons() {
    for (var i = 0; i < 26; i++){
        var hello = document.querySelector('.letter-disabled');
           hello.classList.remove('letter-disabled');
           hello.classList.add('letter-button'); 
           hello.removeAttribute("disabled")
      }
  }

  function weLost() {

    if (guessCounter === 0){
          lossCounter += 1;
          displayLossCounter();

          insertNextPhoto();

          document.querySelector('.textBox').innerHTML = "Game Over! The correct word was "+ word;



          disableAllButtons();
          
        }
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
      guessCounter = 8;
      guessedCorrect = 0;

      //redisplaying the empty letter boxes
      displayWrongLetterBox();
      displayCorrectLetterBox();
      displayGuessCounter();
      insertNextPhoto();

      //enable all buttons 
      enableAllButtons();

     
      let something = document.querySelector('#alphabet-keypad').children;
      
      // turns off opacity to all current buttons
      // by changing any class letter-disabled back to letter-button
      for (var i = 0; i < something.length; i++) {
        if (something[i].classList.contains('letter-disabled')) {
             something[i].classList.remove('letter-disabled');
             something[i].classList.add('letter-button');
             something[i].removeAttribute("disabled");
            };

        // console.log(something[i].innerHTML)
      }

      document.querySelector('.textBox').innerHTML = "Please select a letter<br>Category: Animals";
  }

});







