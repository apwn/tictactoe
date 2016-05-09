/**********************************************
TIC TAC TOE
Version 0.25

line 21: Creation of Game Area
line xx: User Turns
line xx: Find the Winner Functions
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
  $('<div>', {class:"row " + "row"+r}).css({width: '60%', height: '50px', margin: '0 auto'}).appendTo('#game');
    gameArea['row'+r] = [];
    //playerGame['row'+r] = [];
  for (var c = 0; c < numberOfCols; c++) {
    $('<div>', {class:"col " + "col"+c}).css({width: 100/numberOfCols-1 + '%', height: '50px', border: '1px solid #000', display: 'inline-block'}).appendTo('.row' + r);
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
    var playerRow = row2[1];
    var elementToChange = gameArea[playerRow].indexOf(playerCol);
    // Check if element has already been played or not
    if (elementToChange != -1){
      gameArea[playerRow][elementToChange] = currentPlayer;
      // Change of player
      if (currentPlayer === player1){
        console.log("ok");
        currentPlayer = player2;
      } else if (currentPlayer === player2) {
        console.log("ok2");
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









  });
