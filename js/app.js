/**********************************************
TIC TAC TOE
Version 0.25
**********************************************/

// Wait for page to load before running any JS
$(function(){

var rows = 3;
var cols = 3;

// Creating the game area
for (var r = 0; r < rows; r++){
  $('<div>', {class:"row " + "row"+r}).css({width: '60%', height: '50px'}).appendTo('#game');
  for (var c = 0; c < cols; c++) {
    $('<div>', {class:"col" + "col"+c}).css({width: '20%', height: '50px', border: '1px solid #000', display: 'inline-block'}).appendTo('.row' + r);
  }
}





























  });
