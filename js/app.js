/**********************************************
TIC TAC TOE
Version 0.25

line 21: Creation of Game Area
line 34: User Turns
line 96: Find the Winner Functions
**********************************************/

// Wait for page to load before running any JS
$(function(){

// Number or Rows and colums the game should have
var numberOfRows = 3;
var numberOfCols = 3;
var gameArea = {};

// Player info
var player1 = "Thomas";
var player2 = "Bob";
var player1Token = "X";
var player2Token = "O";
var currentPlayer = player1;
var winner;
var totalMoves = 0;

//var playerGame = {};

// Stats
var playerTotalTurns;
var player1Turns = [];
var player2Turns = [];


////////////////////////////////////////////////
// CREATION OF GAME AREA
// PUSH ALL ROWS AND COLS TO OBJECT gameArea
////////////////////////////////////////////////

for (var r = 0; r < numberOfRows; r++){
  $('<div>', {class:"row " + "row"+r}).appendTo('.gamearea');
    gameArea['row'+r] = [];
    //playerGame['row'+r] = [];
  for (var c = 0; c < numberOfCols; c++) {
    $('<div>', {class:"col " + "col"+c}).css({width: 100/numberOfCols-1 + '%'}).appendTo('.row' + r);
    gameArea['row'+r].push('col'+c);
  }
}

 console.log(gameArea);

////////////////////////////////////////////////
// USER TURN
// AND BOX SELECTION
////////////////////////////////////////////////

function playerTurn(){
  if (!winner){
    $('.col').off('click');
    totalMoves++;
    // Find element clicked and change it with player name
    var col = this.className;
    var row = this.parentElement.className;
    var col2 = col.split(' ');
    var row2 = row.split(' ');
    var playerCol = col2[1];
    var classOfCol = '.'+playerCol;
    var playerRow = row2[1];
    var classOfRow = '.'+playerRow;
    var elementToChange = gameArea[playerRow].indexOf(playerCol);
    // Check if element has already been played or not
    if (elementToChange != -1){
      gameArea[playerRow][elementToChange] = currentPlayer;
      // Change of player
      if (currentPlayer === player1){
        $(classOfRow + ' ' + classOfCol).text(player1Token);
        currentPlayer = player2;
      } else if (currentPlayer === player2) {
        $(classOfRow + ' ' + classOfCol).text(player2Token);
        currentPlayer = player1;
      }
    } else {
      alert("already played");
    }
    $('footer').text(currentPlayer + " it's your turn");
    $('.col').on('click', playerTurn);
    rowWinner();
    verticalWinner();
    diagonalWinner();
    draw();
    console.log(gameArea);

  }
}

$('.col').on('click', playerTurn);


////////////////////////////////////////////////
// FIND THE WINNER
// OR DRAW
////////////////////////////////////////////////

// FIND WINNER HORIZONTALLY
function rowWinner(){
  for (prop in gameArea){
    var rowNumber = gameArea[prop];
    console.log(rowNumber);
    // FIND WINNER IN SAME ROW
    var first = rowNumber[0];
    if (rowNumber.every(elem => elem === first)){
      winner = first;
      console.log('Winner is ' + winner);
      return winner;
    }
  }
}


// FIND WINNER VERTICALLY
function verticalWinner(){
  for (prop in gameArea){
    var totalMatchesP1 = 0;
    var totalMatchesP2 = 0;
    var row = gameArea[prop];
    for (var i = 0; i < row.length; i++) {
      if (row[i] === player1){
        var player1Position = [i];
      }
      if (row[i] === player2) {
        var player2Position = [i];
      }
    }
  }
  for (prop2 in gameArea){
    if (gameArea[prop2][player1Position] === player1){
      totalMatchesP1++;
      console.log(totalMatchesP1);
        if(totalMatchesP1 === numberOfCols){
          console.log('WINNER ' + player1);
          winner = player1;
          return winner;
      }
    }
    if (gameArea[prop2][player2Position] === player2){
      totalMatchesP2++;
        if(totalMatchesP2 === numberOfCols){
          console.log('WINNER ' + player2);
          winner = player2;
          return winner;
      }
    }
  }
}

//FIND WINNER DIAGONALLY
function diagonalWinner(){
  var index = 0;
  var totalMatchesP1 = 0;
  var totalMatchesP2 = 0;
  var totalMatchesOppP1 = 0;
  var totalMatchesOppP2 = 0;
  var rightToLeft = numberOfRows-1;
  for (prop in gameArea){

    var position = gameArea[prop][index];
    var positionOpp = gameArea[prop][rightToLeft];
    if (position === player1){
      totalMatchesP1++;
      index++;
    }
    if (position === player2){
      totalMatchesP2++;
      index++;
    }
    if (positionOpp === player1) {
      rightToLeft--;
      totalMatchesOppP1++;
    }
    if (positionOpp === player2) {
      rightToLeft--;
      totalMatchesOppP2++;
    }
    if (totalMatchesP1 === numberOfRows || totalMatchesOppP1 === numberOfRows){
      console.log('WINNER DIAGONALLY ' + player1);
      winner = player1;
      return winner;
    } else if (totalMatchesP2 === numberOfRows || totalMatchesOppP2 === numberOfRows) {
      console.log('WINNER DIAGONALLY ' + player2);
      winner = player2;
      return winner;
    }
  }
}

// If all moves have been played and there's no winner, then it is draw
function draw(){
  var totalMovesPossible = numberOfRows * numberOfCols;
  if (totalMoves === totalMovesPossible && !winner){
    console.log('draw');
  }
}


////////////////////////////////////////////////
// SPLASH PAGE
// FIND SIZE OF GRID
////////////////////////////////////////////////

  $('.grid-size button').on('click', function(){
    var buttonValue = $(this).val();
    var selected = $('.selected');
    var selectedItemValue = $('.selected').val();
    console.log(buttonValue);
    console.log(selectedItemValue);
    console.log(selected[0]);
    if (!selected[0]) {
      $(this).addClass('selected');
      console.log(this);
    } else if (buttonValue !== selectedItemValue){
      $('.selected').removeClass('selected');
      $(this).addClass('selected');
    } else {
      $('.selected').removeClass('selected');
    }
  });




  });
