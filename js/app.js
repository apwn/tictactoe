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
 //console.log(playerGame);

////////////////////////////////////////////////
// USER SELECTION
// SELECT A BOX IN THE GAME
////////////////////////////////////////////////

// function boxSelected(currentPlayer){
//   var col = this.className;
//   var row = this.parentElement.className;
//   var col2 = col.split(' ');
//   var row2 = row.split(' ');
//   var playerCol = col2[1];
//   var playerRow = row2[1];
//   var elementToChange = gameArea[playerRow].indexOf(playerCol);
//   if (elementToChange != -1){
//     gameArea[playerRow][elementToChange] = player;
//   } else {
//     alert("already played");
//   }
//
//   // add function to check winner
//   console.log(gameArea);
// }

////////////////////////////////////////////////
// USER TURNS
// AND BOX SELECTION
////////////////////////////////////////////////

function playerTurn(){
  //while (!winner){
    $('.col').off('click');
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
    // add function to check winner
    console.log(gameArea);

  //}
}


$('.col').on('click', playerTurn);


























  });
