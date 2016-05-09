/**********************************************
TIC TAC TOE
Version 0.25

line 21: Creation of Game Area
line xx: User selection
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
    console.log(gameArea);

  }
}

$('.col').on('click', playerTurn);


////////////////////////////////////////////////
// FIND THE WINNER
// OR DRAW
////////////////////////////////////////////////


function rowWinner(){

  for (prop in gameArea){

    var totalMatchesP2 = 0;
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



function verticalWinner(){
  for (prop in gameArea){
    var totalMatchesP1 = 0;
    var row = gameArea[prop];
    for (var i = 0; i < row.length; i++) {
      if (row[i] === player1){
        var player1Position = [i];

      }
    }
  }
  for (prop2 in gameArea){
    if (gameArea[prop2][player1Position] === player1){
      totalMatchesP1++;
      console.log(totalMatchesP1);
      if(totalMatchesP1 === 3){
        console.log('WINNER');
      }
    }
  }
}














  });
