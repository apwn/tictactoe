/**********************************************
TIC TAC TOE
Version 0.5

line 42: Creation of Game Area
line 75: User Turns
line 129: Find the Winner Functions
line 428: START MENU - find grid size
line 508: START MENU - play button
**********************************************/

// Wait for page to load before running any JS
$(function() {

    // Number or Rows and colums the game should have
    var numberOfRows;
    var numberOfCols;
    var gameArea = {};
    var elementsToWin;
    var fontSize;

    // Player info
    var player1;
    var player2;
    var player1Token = 'X';
    var player2Token = 'O';
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
        $('.player1').html('<p>' + player1 + '</p><p class="number-wins">number of wins</p><p>' + numberOfWinsP1 + '</p>');
        $('.player2').html('<p>' + player2 + '</p><p class="number-wins">number of wins</p><p>' + numberOfWinsP2 + '</p>');
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
        fontSize = $('.col').height() * 0.75 + 'px';
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
                    $(classOfRow + ' ' + classOfCol).html(player1Token);
                    currentPlayer = player2;
                    $('.player2').addClass('your-turn');
                    $('.player1').removeClass('your-turn');
                    totalMoves++;
                    //$('.gamearea').off('click', '.col');
                } else if (currentPlayer === player2) {
                    $(classOfRow + ' ' + classOfCol).html(player2Token);
                    currentPlayer = player1;
                    $('.player1').addClass('your-turn');
                    $('.player2').removeClass('your-turn');
                    totalMoves++;
                }
            } else {
                alert("already played");
            }
            console.log(fontSize);
            $('.token').css('height', fontSize);
            $('footer').html('<p>' + currentPlayer + ' it\'s your turn');
            console.log('total moves: ' + totalMoves);
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
    function rowWinner() {
        for (prop in gameArea) {
            var row = gameArea[prop];
            for (var i = 0; i < row.length; i++) {
                //console.log(row[i]);
                if (row[i] === player1) {
                    //console.log('working');
                    var indexPlayer = i;
                    var stopPoint = indexPlayer + elementsToWin;
                    var positionPlayer = row[indexPlayer];
                    var totalMatchesP1 = 0;
                    for (indexPlayer; indexPlayer < stopPoint; indexPlayer++) {
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
                    for (indexPlayer; indexPlayer < stopPoint; indexPlayer++) {
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

    // FIND VERTICAL WINNER
    function verticalWinner() {
        var indexOfGameArea = [];
        for (prop2 in gameArea) {
            indexOfGameArea.push(prop2);
        }
        for (prop in gameArea) {
            var row = gameArea[prop];
            for (var i = 0; i < row.length; i++) {
                //console.log(row[i]);
                if (row[i] === player1) {
                    //console.log('working');
                    var playerCol = i;
                    var playerRow = prop;
                    var playerIndex = indexOfGameArea.indexOf(prop);
                    var stopPoint = playerIndex + elementsToWin;
                    var totalMatchesP1 = 0;
                    for (playerIndex; playerIndex < stopPoint; playerIndex++) {
                        var rowProp = indexOfGameArea[playerIndex];
                        if (!rowProp) {
                            continue;
                        }
                        var arrayLoc = gameArea[rowProp][playerCol];
                        if (arrayLoc === player1) {
                            totalMatchesP1++;
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
                    var playerCol = i;
                    var playerRow = prop;
                    var playerIndex = indexOfGameArea.indexOf(prop);
                    var stopPoint = playerIndex + elementsToWin;
                    var totalMatchesP2 = 0;
                    for (playerIndex; playerIndex < stopPoint; playerIndex++) {
                        var rowProp = indexOfGameArea[playerIndex];
                        if (!rowProp) {
                            continue;
                        }
                        var arrayLoc = gameArea[rowProp][playerCol];
                        if (arrayLoc === player2) {
                            totalMatchesP2++;
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
    }

    // FIND DIAGONAL WINNER
    function diagonalWinner() {
        var indexOfGameArea = [];
        for (prop2 in gameArea) {
            indexOfGameArea.push(prop2);
        }
        for (prop in gameArea) {
            var row = gameArea[prop];
            for (var i = 0; i < row.length; i++) {
                // FIND WINNER LEFT TO RIGHT
                if (row[i] === player1) {
                    var playerCol = i;
                    var playerRow = prop;
                    var playerIndex = indexOfGameArea.indexOf(prop);
                    var stopPoint = playerIndex + elementsToWin;
                    var totalMatchesP1 = 0;
                    var totalMatchesOppP1 = 0;
                    for (playerIndex; playerIndex < stopPoint; playerIndex++) {
                        var rowProp = indexOfGameArea[playerIndex];
                        if (!rowProp) {
                            continue;
                        }
                        var arrayLoc = gameArea[rowProp][playerCol];
                        playerCol++;
                        if (!arrayLoc) {
                            continue;
                        }
                        if (arrayLoc === player1) {
                            totalMatchesP1++;
                            if (totalMatchesP1 === elementsToWin) {
                                winner = player1;
                                numberOfWinsP1++;
                                winnerDisplay();
                                return winner;
                            }
                        }
                    }
                }
                // FIND WINNER RIGHT TO LEFT
                if (row[i] === player1) {
                    var playerCol = i;
                    var playerRow = prop;
                    var playerIndex = indexOfGameArea.indexOf(prop);
                    var stopPoint = playerIndex + elementsToWin;
                    var totalMatchesOppP1 = 0;
                    for (playerIndex; playerIndex < stopPoint; playerIndex++) {
                        var rowProp = indexOfGameArea[playerIndex];
                        if (!rowProp) {
                            continue;
                        }
                        var arrayLoc = gameArea[rowProp][playerCol];
                        playerCol--;
                        if (arrayLoc === player1) {
                            totalMatchesOppP1++;
                            if (totalMatchesOppP1 === elementsToWin) {
                                winner = player1;
                                numberOfWinsP1++;
                                winnerDisplay();
                                return winner;
                            }
                        }
                    }
                }
                // FIND WINNER LEFT TO RIGHT
                if (row[i] === player2) {
                    var playerCol = i;
                    var playerRow = prop;
                    var playerIndex = indexOfGameArea.indexOf(prop);
                    var stopPoint = playerIndex + elementsToWin;
                    var totalMatchesP2 = 0;
                    for (playerIndex; playerIndex < stopPoint; playerIndex++) {
                        var rowProp = indexOfGameArea[playerIndex];
                        if (!rowProp) {
                            continue;
                        }
                        var arrayLoc = gameArea[rowProp][playerCol];
                        playerCol++;
                        if (!arrayLoc) {
                            continue;
                        }
                        if (arrayLoc === player2) {
                            totalMatchesP2++;
                            console.log('total matches p2: '+totalMatchesP2);
                            if (totalMatchesP2 === elementsToWin) {
                                winner = player2;
                                numberOfWinsP2++;
                                winnerDisplay();
                                return winner;
                            }
                        }
                    }
                }
                // FIND WINNER RIGHT TO LEFT
                if (row[i] === player2) {
                    var playerCol = i;
                    var playerRow = prop;
                    var playerIndex = indexOfGameArea.indexOf(prop);
                    var stopPoint = playerIndex + elementsToWin;
                    var totalMatchesOppP2 = 0;
                    for (playerIndex; playerIndex < stopPoint; playerIndex++) {
                        var rowProp = indexOfGameArea[playerIndex];
                        if (!rowProp) {
                            continue;
                        }
                        var arrayLoc = gameArea[rowProp][playerCol];
                        playerCol--;
                        if (arrayLoc === player2) {
                            totalMatchesOppP2++;
                            if (totalMatchesOppP2 === elementsToWin) {
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
    }

    // DRAW
    function draw() {
        var totalMovesPossible = numberOfRows * numberOfCols;
        console.log('total moves possible: ' + totalMovesPossible);
        if (totalMoves === totalMovesPossible && !winner) {
            console.log('draw');
            $('.gamearea').css('opacity', '0.2');
            $('.end-message')
                .html('<p>--- DRAW ---</p><button type="button" name="newgame">PLAY NEW GAME</button><button type="button" name="reset">START MENU</button>')
                .css('display', 'block');
            playNewGame();
        }
    }

    // DISPLAY WINNER
    function winnerDisplay() {
        $('.gamearea').css('opacity', '0.2');
        $('.end-message')
            .html('<p>Winner is ..... ' + winner.toUpperCase() + '</p><button type="button" name="newgame">PLAY NEW GAME</button><button type="button" name="reset">START MENU</button>')
            .css('display', 'block');
        $('footer').html('<p>Winner is ' + winner + '!</p>');
        playNewGame();
    }

    // PLAY NEW GAME BUTTON
    function playNewGame() {
        $('button[name="newgame"]').on('click', function() {
            $('.end-message').css('display', 'none');
            $('.gamearea').css('opacity', '1').empty();
            winner = undefined;
            totalMoves = 0;
            $('.player2').removeClass('your-turn');
            $('.player1').removeClass('your-turn');
            generateGameArea();
        });
        $('button[name="reset"]').on('click', function() {
            $('.end-message').css('display', 'none');
            $('.gamearea').css('opacity', '1').empty();
            winner = undefined;
            totalMoves = 0;
            $('.row-input').val('');
            $('.player2').removeClass('your-turn');
            $('.player1').removeClass('your-turn');
            $('.selected').removeClass('selected');
            $('.splash').css('display', 'block');
            $('.elements-input').attr('value', '3');
        });
    }

    ////////////////////////////////////////////////
    // SPLASH PAGE
    // FIND SIZE OF GRID & USER TOKEN
    ////////////////////////////////////////////////

    $('.player1-input img').on('click', function() {
        var selectedToken = $('.selected-token-p1');
        var selectedTokenAlt = $(this).attr('alt');
        var selectedTokenImg = $('.selected-token-p1').attr('alt');
        if (!selectedToken[0]) {
            $(this).addClass('selected-token-p1');
        } else if (selectedTokenAlt !== selectedTokenImg) {
          $(selectedToken).removeClass('selected-token-p1');
          $(this).addClass('selected-token-p1');
        } else {
            $(selected).removeClass('selected-token-p1');
        }
    });
    $('.player2-input img').on('click', function() {
        var selectedToken = $('.selected-token-p2');
        var selectedTokenAlt = $(this).attr('alt');
        var selectedTokenImg = $('.selected-token-p2').attr('alt');
        if (!selectedToken[0]) {
            $(this).addClass('selected-token-p2');
        } else if (selectedTokenAlt !== selectedTokenImg) {
          $(selectedToken).removeClass('selected-token-p2');
          $(this).addClass('selected-token-p2');
        } else {
            $(selected).removeClass('selected-token-p2');
        }
    });

    $('.grid-size button').on('click', function() {
        var buttonValue = $(this).val();
        console.log($(this));
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
        if (selected) {
            var ValueOfSelected = $(this).text()[0];
            $('.elements-input').attr('value', ValueOfSelected);
        }
    });

    $('.row-input').on('change keyup paste click', function() {
        var rowInput = $('.row-input').val();
        $('.elements-input').attr('value', rowInput);
    });

    var clickTokenP1 = 0;
    var clickTokenP2 = 0;
    $(".player-token1").click(function(){
        $(".tokens-p1").slideToggle("slow")
        if (!clickTokenP1){
        $(".player-token1").text('CLICK TO CLOSE').css('color','#f3f3f3');
        clickTokenP1++;
      } else{
        $(".player-token1").text('PICK TOKEN P1').css('color','#ffb84d');
        clickTokenP1--;
      }
    });
    $(".player-token2").click(function(){
        $(".tokens-p2").slideToggle("slow")
        if (!clickTokenP2){
        $(".player-token2").text('CLICK TO CLOSE').css('color','#f3f3f3');
        clickTokenP2++;
      } else{
        $(".player-token2").text('PICK TOKEN P2').css('color','#ffb84d');
        clickTokenP2--;
      }
    });

    ////////////////////////////////////////////////
    // PLAY BUTTON FUNCTION
    // START MENU
    ////////////////////////////////////////////////


    $('.play-game').on('click', startMenu);

    function startMenu() {
        var inputPlayer1 = $('input[name="name-player1"]').val();
        var inputPlayer2 = $('input[name="name-player2"]').val();
        var sizeBoxSelected = $('.grid-selection button').hasClass('selected');
        var sizeBoxNumber = $('.selected').text()[0];
        var tokenURLP1 = $('.selected-token-p1').attr('src');
        var tokenAltP1 = $('.selected-token-p1').attr('alt');
        var tokenURLP2 = $('.selected-token-p2').attr('src');
        var tokenAltP2 = $('.selected-token-p2').attr('alt');
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
        }

        if(tokenURLP1){
          player1Token = '<img src="' + tokenURLP1 + '" alt="' + tokenAltP2 + '" class="token" >'
        }
        if(tokenURLP2){
          player2Token = '<img src="' + tokenURLP2 + '" alt="' + tokenAltP2 + '" class="token" >'
        }

        if ((sizeBoxSelected && rowInput) || sizeBoxSelected) {
            numberOfRows = parseInt(sizeBoxNumber);
            numberOfCols = parseInt(sizeBoxNumber);

            if (elementsToWin < 2 || elementsToWin > numberOfRows) {
                $('<div>', {
                    class: 'alert-parent'
                }).appendTo('.splash');
                $('<div>', {
                    class: 'alert'
                }).html('<p><br>Number of elements in a row to win is not valid!<br><br>It should be at least 2 and not higher than the number of rows</p><p class="closeAlertBox">(close window)</p>').appendTo('.alert-parent');

            } else {
                generateGameArea();
                $('.splash').css('display', 'none');
            }
        } else if (rowInput) {
            numberOfRows = parseInt(rowInput);
            numberOfCols = parseInt(rowInput);
            if (elementsToWin < 2 || elementsToWin > numberOfRows) {
                $('<div>', {
                    class: 'alert-parent'
                }).appendTo('.splash');
                $('<div>', {
                    class: 'alert'
                }).html('<p><br>Number of elements in a row to win is not valid!<br><br>It should be at least 2 and not higher than the number of rows</p><p class="closeAlertBox">(close window)</p>').appendTo('.alert-parent');

            } else {
                generateGameArea();
                $('.splash').css('display', 'none');
            }

        }
        $('.closeAlertBox').on('click', function() {
            $('.alert-parent').css('display', 'none');
        })
    }



});
