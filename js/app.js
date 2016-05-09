/**********************************************
TIC TAC TOE
Version 0.25

line 16: Creation of Game Area
**********************************************/

// Wait for page to load before running any JS
$(function(){

// Number or Rows and colums the game should have
var numberOfRows = 3;
var numberOfCols = 3;
var gameArea = {};

////////////////////////////////////////////////
// CREATION OF GAME AREA
// PUSH ALL ROWS AND COLS TO OBJECT gameArea
////////////////////////////////////////////////

for (var r = 0; r < numberOfRows; r++){
  $('<div>', {class:"row " + "row"+r}).css({width: '60%', height: '50px', margin: '0 auto'}).appendTo('#game');
    gameArea['row'+r] = [];
  for (var c = 0; c < numberOfCols; c++) {
    $('<div>', {class:"col" + "col"+c}).css({width: 100/numberOfCols-1 + '%', height: '50px', border: '1px solid #000', display: 'inline-block'}).appendTo('.row' + r);
    gameArea['row'+r].push('col'+c);
  }
}

console.log(gameArea);































  });
