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
var resultsArea = document.getElementById("resultsArea");
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
var playerNamesBox = document.getElementById("playerNamesBox");
var playerOneNameInput = document.getElementById("playerOneNameInput");
var playerTwoNameInput = document.getElementById("playerTwoNameInput");
var currentPlayerText = document.getElementById("currentPlayerText");
var currentPlayerTurn = document.getElementById("currentPlayerTurn");
var guessFieldset = document.getElementById("guessFieldset");
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
var playerOneName = "One";
var playerTwoName = "Two";
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
  function makeHistoricGuessCircle(guessedNumber, results) {
    var historicGuess = document.createElement('div');
    historicGuess.className = "historicGuess";
    if ((numOfGuesses===1 && numOfPlayers===1) || (numOfGuesses===.5 && numOfPlayers===2)) {
      historicGuessesBox.innerHTML = "";
    }
    if (results === "boom") {
      historicGuess.className = "historicGuessCorrect";
      historicGuess.innerHTML = "<strong>" + guessedNumber + "</strong><br />BOOM!";
    } else if (results === "low") {
      historicGuess.innerHTML = "<strong>" + guessedNumber + "</strong><br />Low";
    } else if (results === "high") {
      historicGuess.innerHTML = "<strong>" + guessedNumber + "</strong><br />High";
    }
    historicGuessesBox.insertAdjacentHTML("afterbegin", historicGuess.outerHTML);
  }

  function compareGuessToSecretNum(guessedNumber) {
    var results;
    lastGuessText.style.visibility = "visible";
    resultsText.style.visibility = "visible";
    resetButton.disabled = false;

    if (debugMode===true) {
      console.log("---------------------");
      console.log("Number of Guesses: " + numOfGuesses);
      console.log("Secret Number: " + secretNum);
      console.log("Guessed Number: " + guessedNumber);
      console.log("---------------------");
    }

    if (guessedNumber===secretNum) {
      lastGuess.innerHTML = "<h3>" + guessedNumber + "</h3>";
      resultsArea.style.backgroundColor = "#73C6B6";
      results = "boom";
      levelUp();
    } else if (guessedNumber<secretNum) {
      lastGuess.innerHTML = guessedNumber;
      resultsText.innerHTML = "Too Low!";
      resultsArea.style.backgroundColor = null;
      results = "low"
    } else if (guessedNumber>secretNum) {
      lastGuess.innerHTML = guessedNumber;
      resultsText.innerHTML = "Too High!";
      resultsArea.style.backgroundColor = null;
      results = "high"
    }
    return results;
 }

function youLose() {
  guessButton.disabled = true;
  clearButton.disabled = true;
  guessField.disabled = true;
  resultsArea.style.backgroundColor = "#CD6155";
  lastGuessText.innerHTML = "You lost! The correct number was";
  lastGuess.innerHTML = secretNum;
  lastGuess.style.color = "#404041";
  resultsText.innerHTML = "Press reset to play Again!";
}

 function onePlayerCheckGuess() {
   numOfGuesses++;
   var guessedNumber = parseInt(guessedNumberEl.value);
   var results = compareGuessToSecretNum(guessedNumber);
   if (results === "boom") {
     resultsText.innerHTML = "<h2 id=\"lastGuess\">Boom!</h2>";
     makeHistoricGuessCircle(guessedNumber, results);
   } else if (results === "low") {
     makeHistoricGuessCircle(guessedNumber, results);
   } else if (results === "high") {
     makeHistoricGuessCircle(guessedNumber, results);
   }
   if (numOfGuesses === guessesPerLevel) {
     youLose();
   }
 }

function twoPlayerCheckGuess() {
  numOfGuesses = numOfGuesses + .5;
  var guessedNumber = parseInt(guessedNumberEl.value);
  var results = compareGuessToSecretNum(guessedNumber);
  if (currentPlayer===1) {
    currentPlayer=2;
    var currentPlayerTitle = playerTwoName;
    var currentPlayerStyle = "guessFieldsetPlayerTwo";
  } else {
    currentPlayer=1;
    var currentPlayerTitle = playerOneName;
    var currentPlayerStyle = "guessFieldsetPlayerOne";
  }
  if (results === "boom") {
    resultsText.innerHTML = "<h2 id=\"lastGuess\">Boom!</h2><br />Player " + currentPlayerTitle + " wins!";
    makeHistoricGuessCircle(guessedNumber, results);
  } else if (results === "low") {
    makeHistoricGuessCircle(guessedNumber, results);
  } else if (results === "high") {
    makeHistoricGuessCircle(guessedNumber, results);
  }
  guessFieldset.className = currentPlayerStyle;
  currentPlayerText.innerHTML = currentPlayerTitle;
  if (numOfGuesses === guessesPerLevel) {
    youLose();
  }
}

 function validateGuess() {
   if (guessedNumberEl.value === "") {
     controlGuessErrorState(false);
     guessButton.disabled = true;
     clearButton.disabled = true;
   } else {
      var guessedNumber = Number(guessedNumberEl.value);
      if (guessedNumber > highEnd || guessedNumber < lowEnd || isWholeNumber(guessedNumber) === false){
        controlGuessErrorState(true);
        if (isWholeNumber(guessedNumber) === false) {
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
    lastGuessText.innerHTML = "Your last guess was";
    resetButton.disabled = true;
    lastGuess.innerHTML = "?";
    resultsArea.style.backgroundColor = null;
    historicGuessesBox.innerHTML = "";

    if (debugMode===true) {
      console.log("-------------------------------");
      console.log("Secret Number: " + secretNum);
      console.log("High End: " + highEnd);
      console.log("low End: " + lowEnd);
      console.log("Players: " + numOfPlayers);
      console.log("Guesses Per Level: " + guessesPerLevel);
    }
}

function setPlayerMode(currentMode) {
    if (currentMode===1) {
      numOfPlayersTemp = 1;
      currentPlayerTurn.style.display = "none";
      onePlayerIcon.className = "playerIconsActive";
      twoPlayerIcon.className = "playerIcons";
      guessFieldset.className = "";
    } else {
      numOfPlayersTemp = 2;
      currentPlayerTurn.style.display = "block";
      onePlayerIcon.className = "playerIcons";
      twoPlayerIcon.className = "playerIconsActive";
      guessFieldset.className = "guessFieldsetPlayerOne";
      currentPlayerText.innerHTML = playerOneName;
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
  if (numOfPlayers === 1) {
    onePlayerCheckGuess();
  } else {
    twoPlayerCheckGuess();
  }
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
  setPlayerMode(1);
  playerNamesBox.style.display = "none";
});

twoPlayerIcon.addEventListener("click", function(){
  setPlayerMode(2);
  playerNamesBox.style.display = "block";
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
  if (playerTwoNameInput.value) {
    playerTwoName = playerTwoNameInput.value;
  }
  if (playerOneNameInput.value) {
    playerOneName = playerOneNameInput.value;
  }
  guessesPerLevel = parseInt(guessesPerLevelInput.value);
  settingsBoxOpen = false;
  settingsBox.style.display = "none";
  settingsButton.className = "settingsIcon";
  currentPlayerText.innerHTML = playerOneName;
  restartGame();
})

cancelButton.addEventListener("click", function(e) {
  e.preventDefault();
  lowEndInput.value = lowEnd;
  highEndInput.value = highEnd;
  guessesPerLevelInput.value = guessesPerLevel;
  playerOneNameInput.value = playerOneName;
  playerTwoNameInput.value = playerTwoName;
  numOfPlayersTemp = numOfPlayers;
  if(numOfPlayers === 1){
    setPlayerMode(1);
  } else {
    setPlayerMode(2);
  }
  settingsBoxOpen = false;
  settingsBox.style.display = "none";
  settingsButton.className = "settingsIcon";
})
