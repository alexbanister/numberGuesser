var guessButton = document.getElementById("guessButton");
var clearButton = document.getElementById("clearButton");
var resetButton = document.getElementById("resetButton");
var settingsButton = document.getElementById("settingsButton");
var saveButton = document.getElementById("saveButton");
var cancelButton = document.getElementById("cancelButton");

var mainContent = document.getElementById("mainContent");
var currentLevelText = document.getElementById("currentLevelText");
var currentRangeText = document.getElementById("currentRangeText");
var guessedNumberEl = document.getElementById("guessField");
var resultsText = document.getElementById("resultsText");
var lastGuessText = document.getElementById("lastGuessText");
var lastGuess = document.getElementById("lastGuess");
var errorBox = document.getElementById("errorBox");
var settingsBox = document.getElementById("settingsBox");
var settingsErrorBox = document.getElementById("settingsErrorBox");
var lowEndInput = document.getElementById("lowEndInput");
var highEndInput = document.getElementById("highEndInput");
var guessesPerLevelInput = document.getElementById("guessesPerLevelInput");
var onePlayerIcon = document.getElementById("onePlayerIcon");
var twoPlayerIcon = document.getElementById("twoPlayerIcon");
var currentPlayerText = document.getElementById("currentPlayerText");

var historicGuessesBox = document.getElementById("historicGuessesBox");

var highEnd=100;
var lowEnd=1;
var secretNum=Math.floor(Math.random() * (highEnd - lowEnd +1)) + lowEnd;
var numOfGuesses=0;
var currentLevel=1;
var guessesPerLevel=5;
var levelRangeIncrease=10;
var numOfPlayers = 1;
var numOfPlayersTemp = 1;
var currentPlayer = 1;
var settingsBoxOpen = false;

// TURN DEBUGGING ON TO SEE VALUES IN CONSOLE
var debugMode = true;

if (debugMode===true) {
  console.log("-------------------------------");
  console.log("Secret Number: " + secretNum);
  console.log("High End: " + highEnd);
  console.log("low End: " + lowEnd);
  console.log("Players: " + numOfPlayers);
  console.log("Guesses Per Level: " + guessesPerLevel);
}

  function checkGuess() {
    lastGuessText.style.visibility = "visible";
    resultsText.style.visibility = "visible";
    resetButton.disabled = false;
    var historicGuess = document.createElement('div');
        historicGuess.className = "historicGuess";

    if (numOfGuesses===0) {
      historicGuessesBox.innerHTML = "";
    }

    var guessedNumber = parseInt(guessedNumberEl.value);
    numOfGuesses++;

    if (debugMode===true) {
      console.log("---------------------");
      console.log("Number of Guesses: " + numOfGuesses);
      console.log("Secret Number: " + secretNum);
      console.log("Guessed Number: " + guessedNumber);
      console.log("---------------------");
    }

    if (guessedNumber===secretNum) {
      lastGuess.innerHTML = "<h3>" + guessedNumber + "</h3>";
      resultsText.innerHTML = "<h2 id=\"lastGuess\">Boom!</h2>";
      mainContent.style.backgroundColor = "#ABEBC6";
      historicGuess.innerHTML = "<strong>" + guessedNumber + "</strong><br />BOOM!";
      historicGuess.className = "historicGuessCorrect";
      levelUp();
    } else if (guessedNumber<secretNum) {
      lastGuess.innerHTML = guessedNumber;
      resultsText.innerHTML = "Too Low!";
      historicGuess.innerHTML = "<strong>" + guessedNumber + "</strong><br />Low";
      mainContent.style.backgroundColor = null;
    } else if (guessedNumber>secretNum) {
      lastGuess.innerHTML = guessedNumber;
      resultsText.innerHTML = "Too High!";
      mainContent.style.backgroundColor = null;
      historicGuess.innerHTML = "<strong>" + guessedNumber + "</strong><br />High";
    }
    if (numOfGuesses===guessesPerLevel) {
      guessButton.disabled = true;
      clearButton.disabled = true;
      guessField.disabled = true;
      mainContent.style.backgroundColor = "#F1948A";
      lastGuessText.innerHTML = "You lost! The correct number was";
      lastGuess.innerHTML = secretNum;
      resultsText.innerHTML = "Press reset to play Again!";
    }
    historicGuessesBox.insertAdjacentHTML("afterbegin", historicGuess.outerHTML);
 }

function twoPlayerCheckGuess() {
  if (currentPlayer===1) {
    currentPlayer=2;
    var currentPlayerTitle = "Two";
    var currentPlayerColor = "#3498DB";
  } else {
    currentPlayer=1;
    var currentPlayerTitle = "One";
    var currentPlayerColor = "#F39C12";
  }
  currentPlayerText.innerHTML = currentPlayerTitle
}

 function validateGuess() {
   if (guessedNumberEl.value === "") {
     controlGuessErrorState(false);
     guessButton.disabled = true;
     clearButton.disabled = true;
   } else {
      var guessedNumber = parseInt(guessedNumberEl.value);
      if (guessedNumber > highEnd || guessedNumber < lowEnd || isWholeNumber(guessedNumberEl.value) === false){
        controlGuessErrorState(true);
        if (isWholeNumber(guessedNumberEl.value) === false) {
          errorBox.innerHTML = "<strong>Not a valid number</strong><br />Enter a whole number between " + lowEnd + " and " + highEnd + ".";
        } else if (guessedNumber > highEnd) {
          errorBox.innerHTML = "<strong>Guess outside range</strong><br />Number must be below " + highEnd + ".";
        } else if (guessedNumber < lowEnd) {
          errorBox.innerHTML = "<strong>Guess outside range</strong><br />Number must be above " + lowEnd + ".";
        }
      } else {
        controlGuessErrorState(false);
      }
   }
 }

function controlGuessErrorState(errorState) {
  if (errorState) {
    guessedNumberEl.className = "guessFieldInvalid";
    errorBox.style.display = "block";
    guessButton.disabled = true;
    clearButton.disabled = false;
  } else {
    guessedNumberEl.className = "guessField";
    errorBox.style.display = "none";
    guessButton.disabled = false;
    clearButton.disabled = false;
  }
}

function validateMinMax() {
  var rangeSize = Math.abs(highEndInput.value - lowEndInput.value);
  if (rangeSize < 10) {
    var invalidRange = true;
  }
  if (!isWholeNumber(lowEndInput.value) || !isWholeNumber(highEndInput.value) || invalidRange) {
    settingsErrorBox.style.display = "block";
    settingsErrorBox.style.top = "105px";
    saveButton.disabled = true;
    if (invalidRange) {
      settingsErrorBox.innerHTML = "<strong>Not a valid range</strong><br />Range must be at least 10.";
      console.log("I'm here");
      highEndInput.className = "guessFieldInvalid";
      lowEndInput.className = "guessFieldInvalid";
    } else {
      highEndInput.className = "guessField";
      lowEndInput.className = "guessField";
    }
    if (!isWholeNumber(lowEndInput.value)) {
      settingsErrorBox.innerHTML = "<strong>Not a valid number</strong><br />Enter a whole number";
      lowEndInput.className = "guessFieldInvalid";
    } else {
      if (!invalidRange) {
          lowEndInput.className = "guessField";
      }
    }
    if (!isWholeNumber(highEndInput.value)) {
      settingsErrorBox.innerHTML = "<strong>Not a valid number</strong><br />Enter a whole number";
      highEndInput.className = "guessFieldInvalid";
    } else {
      if (!invalidRange) {
        highEndInput.className = "guessField";
      }
    }
  } else {
    settingsErrorBox.style.display = "none";
    saveButton.disabled = false;
    highEndInput.className = "guessField";
    lowEndInput.className = "guessField";
  }
}

function validateGuessesPerLevel() {
  if (!isWholeNumber(guessesPerLevelInput.value)) {
    settingsErrorBox.style.display = "block";
    settingsErrorBox.style.top = "210px";
    settingsErrorBox.innerHTML = "<strong>Not a valid number</strong><br />Enter a whole number";
    guessesPerLevelInput.className = "guessFieldInvalid";
    saveButton.disabled = true;
  } else {
    settingsErrorBox.style.display = "none";
    saveButton.disabled = false;
    guessesPerLevelInput.className = "guessField";
  }
}

function isWholeNumber(num) {
  var regEx=new RegExp("^[+,-]?[0-9]+$");
  return testRegEx = regEx.test(num);
}

function restartGame() {
    guessedNumberEl.value = null;
    secretNum=Math.floor(Math.random() * (highEnd - lowEnd +1)) + lowEnd;
    numOfGuesses=0;
    currentLevel=1;
    guessField.disabled = false;
    currentLevelText.innerHTML = "Level " + currentLevel;
    currentRangeText.innerHTML = "Guess the number between <strong>" + lowEnd + "</strong> and <strong>" + highEnd + "</strong>";
    lastGuessText.style.visibility = "hidden";
    resultsText.style.visibility = "hidden";
    resetButton.disabled = true;
    lastGuess.innerHTML = "?";
    mainContent.style.backgroundColor = null;

    if (debugMode===true) {
      console.log("-------------------------------");
      console.log("Secret Number: " + secretNum);
      console.log("High End: " + highEnd);
      console.log("low End: " + lowEnd);
      console.log("Players: " + numOfPlayers);
      console.log("Guesses Per Level: " + guessesPerLevel);
    }
}

function levelUp() {
  currentLevel++;
  highEnd += levelRangeIncrease;
  lowEnd -= levelRangeIncrease;
  secretNum=Math.floor(Math.random() * (highEnd - lowEnd +1)) + lowEnd;
  numOfGuesses=0;
  currentLevelText.innerHTML = "Level " + currentLevel;
  currentRangeText.innerHTML = "Guess the number between <strong>" + lowEnd + "</strong> and <strong>" + highEnd + "</strong>";
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

lowEndInput.addEventListener("input", function(){
  validateMinMax();
});

highEndInput.addEventListener("input", function(){
  validateMinMax();
});

guessesPerLevelInput.addEventListener("input", function(){
  validateGuessesPerLevel();
});

settingsButton.addEventListener("click", function(e){
  e.preventDefault();
  if (settingsBoxOpen === false) {
    settingsBoxOpen = true;
    settingsBox.style.display = "block";
    settingsButton.className = "settingsIconActive";
  } else {
    settingsBoxOpen = false;
    settingsBox.style.display = "none";
    settingsButton.className = "settingsIcon";
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
  if (parseInt(lowEndInput.value) > parseInt(highEndInput.value)) {
    highEnd = parseInt(lowEndInput.value);
    lowEnd = parseInt(highEndInput.value);
  } else {
    lowEnd = parseInt(lowEndInput.value);
    highEnd = parseInt(highEndInput.value);
  }
  numOfPlayers = numOfPlayersTemp;
  guessesPerLevel = parseInt(guessesPerLevelInput.value)*numOfPlayers;
  settingsBoxOpen = false;
  settingsBox.style.display = "none";
  settingsButton.className = "settingsIcon";
  restartGame();
})

cancelButton.addEventListener("click", function(e) {
  e.preventDefault();
  lowEndInput.value = lowEnd;
  highEndInput.value = highEnd;
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
  settingsBox.style.display = "none";
  settingsButton.className = "settingsIcon";
})
