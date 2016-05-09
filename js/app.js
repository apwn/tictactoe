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
var player2;
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

function boxSelected(){
  var col = this.className;
  var row = this.parentElement.className;
  var col2 = col.split(' ');
  var row2 = row.split(' ');
  var playerCol = col2[1];
  var playerRow = row2[1];
  var elementToChange = gameArea[playerRow].indexOf(playerCol)
  gameArea[playerRow][elementToChange] = player1;
  // add function to check winner
}

$('.col').on('click', boxSelected);

//console.log(classes2);




























  });
