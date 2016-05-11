/**********************************************
TIC TAC TOE
Version 0.25

line 21: Creation of Game Area
line 34: User Turns
line 96: Find the Winner Functions
**********************************************/

// Wait for page to load before running any JS
$(function() {

    // Number or Rows and colums the game should have
    var numberOfRows;
    var numberOfCols;
    var gameArea = {};
    var elementsToWin;

    // Player info
    var player1;
    var player2;
    var player1Token = "X";
    var player2Token = "O";
    var currentPlayer;
    var winner;
    var totalMoves = 0;
    var numberOfWinsP1;
    var numberOfWinsP2;

    //var playerGame = {};

    // Stats
    var playerTotalTurns;
    var player1Turns = [];
    var player2Turns = [];


    ////////////////////////////////////////////////
    // CREATION OF GAME AREA
    // PUSH ALL ROWS AND COLS TO OBJECT gameArea
    ////////////////////////////////////////////////

    function generateGameArea() {
        $('.player1').html('<p>'+player1+'</p><p class="number-wins">number of wins</p><p>'+numberOfWinsP1+'</p>');
        $('.player2').html('<p>'+player2+'</p><p class="number-wins">number of wins</p><p>'+numberOfWinsP2+'</p>');
        currentPlayer = player1;
        for (var r = 0; r < numberOfRows; r++) {
            $('<div>', {
                class: "row " + "row" + r
            }).css({
                height: 100 / numberOfRows + '%'
            }).appendTo('.gamearea');
            gameArea['row' + r] = [];
            //playerGame['row'+r] = [];
            for (var c = 0; c < numberOfCols; c++) {
                $('<div>', {
                    class: "col " + "col" + c
                }).css({
                    width: 100 / numberOfCols + '%'
                }).appendTo('.row' + r);
                gameArea['row' + r].push('col' + c);
            }
        }
        var fontSize = $('.col').height() * 0.75 + 'px';
        $('.col').css('font-size', fontSize);
        $('.player1').addClass('your-turn');
        $('footer').html('<p>' + currentPlayer + ' it\'s your turn');
    }


    ////////////////////////////////////////////////
    // USER TURN
    // AND BOX SELECTION
    ////////////////////////////////////////////////

    function playerTurn() {
        if (!winner) {
            // Find element clicked and change it with player name
            var col = this.className;
            var row = this.parentElement.className;
            var col2 = col.split(' ');
            var row2 = row.split(' ');
            var playerCol = col2[1];
            var classOfCol = '.' + playerCol;
            var playerRow = row2[1];
            var classOfRow = '.' + playerRow;
            var elementToChange = gameArea[playerRow].indexOf(playerCol);
            // Check if element has already been played or not
            if (elementToChange != -1) {
                gameArea[playerRow][elementToChange] = currentPlayer;
                // Change of player
                if (currentPlayer === player1) {
                    $(classOfRow + ' ' + classOfCol).text(player1Token);
                    currentPlayer = player2;
                    $('.player2').addClass('your-turn');
                    $('.player1').removeClass('your-turn');
                    totalMoves++;
                    //$('.gamearea').off('click', '.col');
                } else if (currentPlayer === player2) {
                    $(classOfRow + ' ' + classOfCol).text(player2Token);
                    currentPlayer = player1;
                    $('.player1').addClass('your-turn');
                    $('.player2').removeClass('your-turn');
                    totalMoves++;
                }
            } else {
                alert("already played");
            }
            $('footer').html('<p>' + currentPlayer + ' it\'s your turn');
            console.log('total moves: '+totalMoves);
            rowWinner();
            verticalWinner();
            //diagonalWinner();
            draw();
            console.log(gameArea);

        }
    }

    $('.gamearea').on('click', '.col', playerTurn);


    ////////////////////////////////////////////////
    // FIND THE WINNER
    // OR DRAW
    ////////////////////////////////////////////////

    // FIND WINNER HORIZONTALLY V1 - WORKING BUT NOT ALLOWING TO TELL HOW MANY ELEMENT IN ROW TO WIN
    // function rowWinner() {
    //     for (prop in gameArea) {
    //         var rowNumber = gameArea[prop];
    //         console.log(rowNumber);
    //         // FIND WINNER IN SAME ROW
    //         var first = rowNumber[0];
    //         if (rowNumber.every(elem => elem === first)) {
    //             winner = first;
    //             console.log('Winner is ' + winner);
    //             winnerDisplay();
    //             return winner;
    //         }
    //     }
    // }

    // FIND WINNER HORIZONTALLY
    function rowWinner(){
      for (prop in gameArea){
        var row = gameArea[prop];
        for (var i = 0; i < row.length; i++) {
          //console.log(row[i]);
          if (row[i] === player1) {
            //console.log('working');
            var indexPlayer = i;
            var stopPoint = indexPlayer + elementsToWin;
            var positionPlayer = row[indexPlayer];
            var totalMatchesP1 = 0;
            for (indexPlayer; indexPlayer<stopPoint; indexPlayer++) {
              if (row[indexPlayer] === player1) {
                totalMatchesP1++;
                //console.log(totalMatchesP1);
              }
            }
            if (totalMatchesP1 === elementsToWin) {
            winner = player1;
            numberOfWinsP1++;
            winnerDisplay();
            return winner;
            }
          }
          if (row[i] === player2) {
            var indexPlayer = i;
            var stopPoint = indexPlayer + elementsToWin;
            var positionPlayer = row[indexPlayer]
            var totalMatchesP2 = 0;
            for (indexPlayer; indexPlayer<stopPoint; indexPlayer++) {
              if (row[indexPlayer] === player2) {
                totalMatchesP2++;
                //console.log(totalMatchesP2);
              }
            }
            if (totalMatchesP2 === elementsToWin) {
              winner = player2;
              numberOfWinsP2++;
              winnerDisplay();
              return winner;
            }
          }
        }
      }
    }



    // FIND WINNER VERTICALLY
    // function verticalWinner() {
    //     for (prop in gameArea) {
    //         var totalMatchesP1 = 0;
    //         var totalMatchesP2 = 0;
    //         var row = gameArea[prop];
    //         for (var i = 0; i < row.length; i++) {
    //             if (row[i] === player1) {
    //                 var player1Position = [i];
    //             }
    //             if (row[i] === player2) {
    //                 var player2Position = [i];
    //             }
    //         }
    //     }
    //     for (prop2 in gameArea) {
    //         if (gameArea[prop2][player1Position] === player1) {
    //             totalMatchesP1++;
    //             if (totalMatchesP1 === elementsToWin) {
    //                 console.log('WINNER ' + player1);
    //                 winner = player1;
    //                 numberOfWinsP1++;
    //                 winnerDisplay();
    //                 return winner;
    //             }
    //         }
    //         if (gameArea[prop2][player2Position] === player2) {
    //             totalMatchesP2++;
    //             if (totalMatchesP2 === elementsToWin) {
    //                 console.log('WINNER ' + player2);
    //                 winner = player2;
    //                 numberOfWinsP2++;
    //                 winnerDisplay();
    //                 return winner;
    //             }
    //         }
    //     }
    // }

    function verticalWinner(){
      //console.log(gameArea[0]);
      var indexOfGameArea = [];
      for (prop2 in gameArea){
        indexOfGameArea.push(prop2);
      }
      console.log(indexOfGameArea);
      for (prop in gameArea){
        var row = gameArea[prop];
        for (var i = 0; i < row.length; i++) {
          //console.log(row[i]);
          if (row[i] === player1) {
            //console.log('working');
            var playerCol = i;
            var playerRow = prop;
            var playerIndex = indexOfGameArea.indexOf(prop);
            //console.log(playerRow);
            console.log(playerIndex);
            var stopPoint = playerIndex + elementsToWin;
            console.log(stopPoint);
            var totalMatchesP1 = 0;
            for (playerIndex; playerIndex < stopPoint; playerIndex++){
              var rowProp = indexOfGameArea[playerIndex];
              if(!rowProp){
                console.log('rowprop false');
                continue;
              }
              console.log(rowProp);
              var arrayLoc = gameArea[rowProp][playerCol];
              console.log(arrayLoc);
              if (arrayLoc === player1) {
                totalMatchesP1++;
                console.log(totalMatchesP1);
                if (totalMatchesP1 === elementsToWin) {
                  winner = player1;
                  numberOfWinsP1++;
                  winnerDisplay();
                  return winner;
                }
              }
            }
          }
          if (row[i] === player2) {
            //console.log('working');
            var playerCol = i;
            var playerRow = prop;
            var playerIndex = indexOfGameArea.indexOf(prop);
            //console.log(playerRow);
            console.log(playerIndex);
            var stopPoint = playerIndex + elementsToWin;
            console.log(stopPoint);
            var totalMatchesP2 = 0;
            for (playerIndex; playerIndex < stopPoint; playerIndex++){
              var rowProp = indexOfGameArea[playerIndex];
              if(!rowProp){
                console.log('rowprop false');
                continue;
              }
              console.log(rowProp);
              var arrayLoc = gameArea[rowProp][playerCol];
              console.log(arrayLoc);
              if (arrayLoc === player2) {
                totalMatchesP2++;
                console.log(totalMatchesP2);
                if (totalMatchesP2 === elementsToWin) {
                  winner = player2;
                  numberOfWinsP2++;
                  winnerDisplay();
                  return winner;
                }
              }
            }
          }
        }
      }
      // var totalMatchesP1 = 0;
      // for (playerIndex; playerIndex < stopPoint; playerIndex++){
      //   var rowProp = indexOfGameArea[playerIndex];
      //   console.log(rowProp);
      //   var arrayLoc = gameArea[rowProp][playerCol];
      //   console.log(arrayLoc);
      //   if (arrayLoc === player1) {
      //     totalMatchesP1++;
      //     console.log(totalMatchesP1);
      //     if (totalMatchesP1 === elementsToWin) {
      //       console.log('P1 is a super cool wiiner');
      //     }
      //   }
      // }
    }

    //FIND WINNER DIAGONALLY
    function diagonalWinner() {
        // var index = 0;
        var totalMatchesP1 = 0;
        var totalMatchesP2 = 0;
        var totalMatchesOppP1 = 0;
        var totalMatchesOppP2 = 0;
        var rightToLeft = elementsToWin - 1;
        //for (prop2 in gameArea){
          // var row = gameArea[prop2];
          // for (var i = 0; i < row.length; i++) {
          //     if (row[i] === player1) {
          //         var player1Position = [i];
          //     }
          //     if (row[i] === player2) {
          //         var player2Position = [i];
          //     }
          // }
      //  }
        //console.log(player1Position);
        for (prop in gameArea) {
          var row = gameArea[prop];
          for (var i = 0; i < row.length; i++) {
              if (row[i] === player1) {
                  var player1Position = [i];
              }
              if (row[i] === player2) {
                  var player2Position = [i];
              }
          }

            var positionP1 = gameArea[prop][player1Position];
            var positionP2 = gameArea[prop][player2Position];
            var positionOpp = gameArea[prop][rightToLeft];

            if (positionP1 === player1) {
                totalMatchesP1++;
                player1Position++;
            }
            if (positionP2 === player2) {
                totalMatchesP2++;
                player2Position++;
            }
            if (positionOpp === player1) {
                rightToLeft--;
                totalMatchesOppP1++;
            }
            if (positionOpp === player2) {
                rightToLeft--;
                totalMatchesOppP2++;
            }
            if (totalMatchesP1 === elementsToWin || totalMatchesOppP1 === elementsToWin) {
                console.log('WINNER DIAGONALLY ' + player1);
                winner = player1;
                numberOfWinsP1++;
                winnerDisplay();
                return winner;
            } else if (totalMatchesP2 === elementsToWin || totalMatchesOppP2 === elementsToWin) {
                console.log('WINNER DIAGONALLY ' + player2);
                winner = player2;
                numberOfWinsP2++;
                winnerDisplay();
                return winner;
            }
        }
    }

    // DRAW
    function draw() {
        var totalMovesPossible = numberOfRows * numberOfCols;
        console.log('total moves possible: '+totalMovesPossible);
        if (totalMoves === totalMovesPossible && !winner) {
            console.log('draw');
            $('.gamearea').css('opacity','0.2');
            $('.end-message')
            .html('<p>--- DRAW ---</p><button type="button" name="newgame">PLAY NEW GAME</button>')
            .css('display','block');
            playNewGame();
        }
    }

    // DISPLAY WINNER
    function winnerDisplay(){
      $('.gamearea').css('opacity','0.2');
      $('.end-message')
      .html('<p>Winner is ..... '+ winner.toUpperCase() +'</p><button type="button" name="newgame">PLAY NEW GAME</button><button type="button" name="reset">START MENU</button>')
      .css('display','block');
      $('footer').html('<p>Winner is '+winner+'!</p>');
      playNewGame();
    }

    // PLAY NEW GAME BUTTON
    function playNewGame(){
    $('button[name="newgame"]').on('click', function(){
      $('.end-message').css('display','none');
      $('.gamearea').css('opacity','1').empty();
      winner = undefined;
      totalMoves = 0;
      $('.player2').removeClass('your-turn');
      $('.player1').removeClass('your-turn');
      generateGameArea();
    });
    $('button[name="reset"]').on('click', function(){
      $('.end-message').css('display','none');
      $('.gamearea').css('opacity','1').empty();
      winner = undefined;
      totalMoves = 0;
      $('.player2').removeClass('your-turn');
      $('.player1').removeClass('your-turn');
      $('.splash').css('display','block');
    });
    }

    ////////////////////////////////////////////////
    // SPLASH PAGE
    // FIND SIZE OF GRID
    ////////////////////////////////////////////////

    $('.grid-size button').on('click', function() {
        var buttonValue = $(this).val();
        var selected = $('.selected');
        var selectedItemValue = $('.selected').val();
        if (!selected[0]) {
            $(this).addClass('selected');
        } else if (buttonValue !== selectedItemValue) {
            $(selected).removeClass('selected');
            $(this).addClass('selected');
        } else {
            $(selected).removeClass('selected');
        }
        // Change number of elements to win
        if (selected){
        var ValueOfSelected = $(this).text()[0];
        $('.elements-input').attr('value',ValueOfSelected);
        }
    });

    $('.row-input').on('change keyup paste click', function(){
      var rowInput = $('.row-input').val();
      $('.elements-input').attr('value',rowInput);
    });

    ////////////////////////////////////////////////
    // PLAY BUTTON FUNCTION
    //
    ////////////////////////////////////////////////


    $('.play-game').on('click',startMenu);

    function startMenu(){
      var inputPlayer1 = $('input[name="name-player1"]').val();
      var inputPlayer2 = $('input[name="name-player2"]').val();
      var sizeBoxSelected = $('.grid-selection button').hasClass('selected');
      var sizeBoxNumber = $('.selected').text()[0];
      player1 = inputPlayer1;
      player2 = inputPlayer2;
      numberOfWinsP1 = 0;
      numberOfWinsP2 = 0;
      elementsToWin = parseInt($('.elements-input').val());
      var rowInput = $('.row-input').val();
      if (rowInput.length === 0) {
          rowInput = false;
      }

      if (!inputPlayer1 || !inputPlayer2) {
          $('<div>', {
              class: 'alert-parent'
          }).appendTo('.splash');
          $('<div>', {
              class: 'alert'
          }).html('<p><br>You don\'t want to tell me your name?<br><br>I\'m not allowed to talk to strangers... Sorry</p><p class="closeAlertBox">(close window)</p>').appendTo('.alert-parent');
      } else if (!sizeBoxSelected && !rowInput) {
          $('<div>', {
              class: 'alert-parent'
          }).appendTo('.splash');
          $('<div>', {
              class: 'alert'
          }).html('<p><br>Sorry I can\'t read your mind...<br><br>You need to tell me the size of the grid</p><p class="closeAlertBox">(close window)</p>').appendTo('.alert-parent');
      } else if (elementsToWin > numberOfRows || elementsToWin < 2) {
          $('<div>', {
              class: 'alert-parent'
          }).appendTo('.splash');
          $('<div>', {
              class: 'alert'
          }).html('<p><br>Number of elements in a row to win is not valid!<br><br>It should be at least 2 and not higher than the number of rows</p><p class="closeAlertBox">(close window)</p>').appendTo('.alert-parent');

      } else if ((sizeBoxSelected && rowInput) || sizeBoxSelected) {
          numberOfRows = parseInt(sizeBoxNumber);
          numberOfCols = parseInt(sizeBoxNumber);
          generateGameArea();
          $('.splash').css('display', 'none');
      } else if (rowInput) {
          numberOfRows = parseInt(rowInput);
          numberOfCols = parseInt(rowInput);
          generateGameArea();
          $('.splash').css('display', 'none');
      }

      $('.closeAlertBox').on('click', function() {
          $('.alert-parent').css('display', 'none');
      })
    }



});
