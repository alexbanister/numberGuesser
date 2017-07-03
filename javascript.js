var guessButton = document.getElementById("guessButton");
var clearButton = document.getElementById("clearButton");
var resetButton = document.getElementById("resetButton");
var settingsButton = document.getElementById("settingsButton");
var saveButton = document.getElementById("saveButton");
var cancelButton = document.getElementById("cancelButton");

var guessedNumberEl = document.getElementById("guessField");
var resultsText = document.getElementById("resultsText");
var lastGuess = document.getElementById("lastGuess");
var errorBox = document.getElementById("errorBox");
var settingsBox = document.getElementById("settingsBox");
var lowEndInput = document.getElementById("lowEndInput");
var highEndInput = document.getElementById("highEndInput");
var guessesPerLevelInput = document.getElementById("guessesPerLevelInput");
var onePlayerIcon = document.getElementById("onePlayerIcon");
var twoPlayerIcon = document.getElementById("twoPlayerIcon");

var hightEnd=100;
var lowEnd=10;
var secretNum=Math.floor(Math.random() * (hightEnd - lowEnd +1)) + lowEnd;
var numOfGuesses=0;
var currentLevel=1;
var guessesPerLevel=10;
var numOfPlayers = 1;
var numOfPlayersTemp = 1;
var settingsBoxOpen = false;

console.log("-------------------------------");
console.log("Secret Number: " + secretNum);
console.log("High End: " + hightEnd);
console.log("low End: " + lowEnd);
console.log("Players: " + numOfPlayers);
console.log("Guesses Per Level: " + guessesPerLevel);

  function checkGuess() {
    var guessedNumber = parseInt(guessedNumberEl.value);
    numOfGuesses++;

    document.getElementById("lastGuessText").style.visibility = "visible";
    document.getElementById("resultsText").style.visibility = "visible";
    document.getElementById("resetButton").disabled = false;

    console.log("---------------------");
    console.log("Number of Guesses: " + numOfGuesses);
    console.log("---------------------");

    if (guessedNumber===secretNum) {
      lastGuess.innerHTML = guessedNumber;
      resultsText.innerHTML = "Boom!";
    } else if (guessedNumber<secretNum) {
      lastGuess.innerHTML = guessedNumber;
      resultsText.innerHTML = "Too Low!";

    } else if (guessedNumber>secretNum) {
      lastGuess.innerHTML = guessedNumber;
      resultsText.innerHTML = "Too High!";
    }
 }

 function validateGuess() {
   if (guessedNumberEl.value === "") {
     guessedNumberEl.className = "guessField";
     errorBox.style.visibility = "hidden";
     document.getElementById("guessButton").disabled = true;
     document.getElementById("clearButton").disabled = true;
   } else {
      var guessedNumber = parseInt(guessedNumberEl.value);
      if (isNaN(guessedNumber) || guessedNumber > hightEnd || guessedNumber < lowEnd){
        guessedNumberEl.className = "guessFieldInvalid";
        errorBox.style.visibility = "visible";
        document.getElementById("guessButton").disabled = true;
        document.getElementById("clearButton").disabled = false;
        if (isNaN(guessedNumber)) {
          document.getElementById("errorBox").innerHTML = "<strong>Not a valid number</strong><br />Enter a whole number between " + lowEnd + " and " + hightEnd + ".";
        } else if (guessedNumber > hightEnd) {
          document.getElementById("errorBox").innerHTML = "<strong>Guess outside range</strong><br />Number must be below " + hightEnd + ".";
        } else if (guessedNumber < lowEnd) {
          document.getElementById("errorBox").innerHTML = "<strong>Guess outside range</strong><br />Number must be above " + lowEnd + ".";
        }
      } else {
        guessedNumberEl.className = "guessField";
        errorBox.style.visibility = "hidden";
        document.getElementById("guessButton").disabled = false;
        document.getElementById("clearButton").disabled = false;
      }
   }
 }

function restartGame() {
    guessedNumberEl.value = null;
    secretNum=Math.floor(Math.random() * (hightEnd - lowEnd +1)) + lowEnd;
    numOfGuesses=0;
    currentLevel=1;
    document.getElementById("lastGuessText").style.visibility = "hidden";
    document.getElementById("resultsText").style.visibility = "hidden";
    document.getElementById("resetButton").disabled = true;
    lastGuess.innerHTML = "?";
    console.log("-------------------------------");
    console.log("Secret Number: " + secretNum);
    console.log("High End: " + hightEnd);
    console.log("low End: " + lowEnd);
    console.log("Players: " + numOfPlayers);
    console.log("Guesses Per Level: " + guessesPerLevel);
}

guessButton.addEventListener("click", function(e){
  e.preventDefault();
  checkGuess();
  guessedNumberEl.value = null;
  validateGuess();
});

clearButton.addEventListener("click", function(e){
  e.preventDefault();
  guessedNumberEl.value = null;
  validateGuess();
});

resetButton.addEventListener("click", function(e){
  e.preventDefault();
  restartGame();
});

guessedNumberEl.addEventListener("input", function(){
  validateGuess();
});

settingsButton.addEventListener("click", function(e){
  e.preventDefault();
  if (settingsBoxOpen === false) {
    settingsBoxOpen = true;
    settingsBox.style.visibility = "visible";
  } else {
    settingsBoxOpen = false;
    settingsBox.style.visibility = "hidden";
  }
});

onePlayerIcon.addEventListener("click", function(){
  numOfPlayersTemp = 1;
  onePlayerIcon.className = "playerIconsActive";
  twoPlayerIcon.className = "playerIcons";
});

twoPlayerIcon.addEventListener("click", function(){
  numOfPlayersTemp = 2;
  onePlayerIcon.className = "playerIcons";
  twoPlayerIcon.className = "playerIconsActive";
});

saveButton.addEventListener("click", function(e) {
  e.preventDefault();
  lowEnd = lowEndInput.value;
  hightEnd = highEndInput.value;
  guessesPerLevel = guessesPerLevelInput.value;
  numOfPlayers = numOfPlayersTemp;
  settingsBoxOpen = false;
  settingsBox.style.visibility = "hidden";
  restartGame();
})

cancelButton.addEventListener("click", function(e) {
  e.preventDefault();
  lowEndInput.value = lowEnd;
  highEndInput.value = hightEnd;
  guessesPerLevelInput.value = guessesPerLevel;
  numOfPlayersTemp = numOfPlayers;
  if(numOfPlayers === 1){
    onePlayerIcon.className = "playerIconsActive";
    twoPlayerIcon.className = "playerIcons";
  } else {
    onePlayerIcon.className = "playerIcons";
    twoPlayerIcon.className = "playerIconsActive";
  }
  settingsBoxOpen = false;
  settingsBox.style.visibility = "hidden";
})
