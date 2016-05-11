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

    // Player info
    var player1;
    var player2;
    var player1Token = "X";
    var player2Token = "O";
    var currentPlayer;
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

    function generateGameArea() {
        $('.player1').text(player1);
        $('.player2').text(player2);
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
            rowWinner();
            verticalWinner();
            diagonalWinner();
            draw();
            console.log(gameArea);

        }
    }

    $('.gamearea').on('click', '.col', playerTurn);


    ////////////////////////////////////////////////
    // FIND THE WINNER
    // OR DRAW
    ////////////////////////////////////////////////

    // FIND WINNER HORIZONTALLY
    function rowWinner() {
        for (prop in gameArea) {
            var rowNumber = gameArea[prop];
            console.log(rowNumber);
            // FIND WINNER IN SAME ROW
            var first = rowNumber[0];
            if (rowNumber.every(elem => elem === first)) {
                winner = first;
                console.log('Winner is ' + winner);
                winnerDisplay();
                return winner;
            }
        }
    }


    // FIND WINNER VERTICALLY
    function verticalWinner() {
        for (prop in gameArea) {
            var totalMatchesP1 = 0;
            var totalMatchesP2 = 0;
            var row = gameArea[prop];
            for (var i = 0; i < row.length; i++) {
                if (row[i] === player1) {
                    var player1Position = [i];
                }
                if (row[i] === player2) {
                    var player2Position = [i];
                }
            }
        }
        for (prop2 in gameArea) {
            if (gameArea[prop2][player1Position] === player1) {
                totalMatchesP1++;
                console.log(numberOfCols);
                console.log(totalMatchesP1);
                if (totalMatchesP1 === numberOfCols) {
                    console.log('WINNER ' + player1);
                    winner = player1;
                    winnerDisplay();
                    return winner;
                }
            }
            if (gameArea[prop2][player2Position] === player2) {
                totalMatchesP2++;
                if (totalMatchesP2 === numberOfCols) {
                    console.log('WINNER ' + player2);
                    winner = player2;
                    winnerDisplay();
                    return winner;
                }
            }
        }
    }

    //FIND WINNER DIAGONALLY
    function diagonalWinner() {
        var index = 0;
        var totalMatchesP1 = 0;
        var totalMatchesP2 = 0;
        var totalMatchesOppP1 = 0;
        var totalMatchesOppP2 = 0;
        var rightToLeft = numberOfRows - 1;
        for (prop in gameArea) {

            var position = gameArea[prop][index];
            var positionOpp = gameArea[prop][rightToLeft];
            if (position === player1) {
                totalMatchesP1++;
                index++;
            }
            if (position === player2) {
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
            if (totalMatchesP1 === numberOfRows || totalMatchesOppP1 === numberOfRows) {
                console.log('WINNER DIAGONALLY ' + player1);
                winner = player1;
                winnerDisplay();
                return winner;
            } else if (totalMatchesP2 === numberOfRows || totalMatchesOppP2 === numberOfRows) {
                console.log('WINNER DIAGONALLY ' + player2);
                winner = player2;
                winnerDisplay();
                return winner;
            }
        }
    }

    // DRAW
    function draw() {
        var totalMovesPossible = numberOfRows * numberOfCols;
        if (totalMoves === totalMovesPossible && !winner) {
            console.log('draw');
            $('.gamearea').css('opacity','0.2');
            $('.end-message')
            .html('<p>... DRAW ... </p><button type="button" name="newgame">PLAY NEW GAME</button>')
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
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
        } else {
            $('.selected').removeClass('selected');
        }
    });

    ////////////////////////////////////////////////
    // PLAY BUTTON FUNCTION
    //
    ////////////////////////////////////////////////


    $('.play-game').on('click',startMenu);

    function startMenu(){
      console.log('workingnngngng?');
      var inputPlayer1 = $('input[name="name-player1"]').val();
      var inputPlayer2 = $('input[name="name-player2"]').val();
      var sizeBoxSelected = $('.grid-selection button').hasClass('selected');
      var sizeBoxNumber = $('.selected').text()[0];
      var rowInput = $('.row-input').val();
      if (rowInput.length === 0) {
          rowInput = false;
      }
      console.log(inputPlayer1);
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
      } else if ((sizeBoxSelected && rowInput) || sizeBoxSelected) {
          numberOfRows = parseInt(sizeBoxNumber);
          numberOfCols = parseInt(sizeBoxNumber);
          player1 = inputPlayer1;
          player2 = inputPlayer2;
          //$('.play-game').off('click');
          generateGameArea();
          $('.splash').css('display', 'none');
      } else if (rowInput) {
          numberOfRows = parseInt(rowInput);
          numberOfCols = parseInt(rowInput);
          player1 = inputPlayer1;
          player2 = inputPlayer2;
          //$('.play-game').off('click');
          generateGameArea();
          $('.splash').css('display', 'none');
      }

      $('.closeAlertBox').on('click', function() {
          $('.alert-parent').css('display', 'none');
      })
    }



});
