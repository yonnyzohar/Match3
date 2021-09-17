var GlobalMatchChecker = {
    winners: [],
    winnerNames: [],


    checkForMatch: function (arr) {
        GlobalMatchChecker.winners.splice(0);
        GlobalMatchChecker.winnerNames.splice(0);
        var horizontalWin = GlobalMatchChecker.checkHorizontalWin(arr);
        var verticallWin = GlobalMatchChecker.checkVerticalWin(arr);
        return GlobalMatchChecker.winners;
    },



    checkHorizontalWin: function (arr) {
        var winners = GlobalMatchChecker.winners;
        var winnerNames = GlobalMatchChecker.winnerNames;
        var count = 1;
        var i = 0;
        var j = 0;
        var win = false;
        var currentType;
        var prevType;

        //check horizontal win

        for (i = 0; i < arr.length; i++) {
            count = 1;
            //trace("=================");
            for (j = 0; j < arr[i].length; j++) {
                if (arr[i][j].type != Game.EMPTY_TILE) {
                    if (j == 0) {
                        currentType = arr[i][j].type;
                        prevType = arr[i][j].type;
                    } else {
                        currentType = arr[i][j].type;

                        if (currentType == prevType) {
                            count++;
                        } else {
                            count = 1;
                        }
                        prevType = currentType;
                    }

                    if (count == 3) {
                        win = true;
                        //trace("WIN!");
                        winners.push({
                            "x": i,
                            "y": j - 2
                        });
                        winners.push({
                            "x": i,
                            "y": j - 1
                        });
                        winners.push({
                            "x": i,
                            "y": j
                        });

                    }
                    if (count > 3) {
                        winners.push({
                            "x": i,
                            "y": j
                        })
                        winnerNames.push(arr[i][j].type);
                    }
                }
            }

            //winners = checkIfBricksStillFlying(winners);
        }



        return win;
    },

    checkVerticalWin: function (arr) {
        var winners = GlobalMatchChecker.winners;
        var winnerNames = GlobalMatchChecker.winnerNames;
        var count = 1;
        var i = 0;
        var j = 0;
        var win = false;
        var currentType;
        var prevType;


        //check vertical win
        for (var b = 0; b < arr.length; b++) {
            count = 1;
            for (i = 0; i < arr[b].length; i++) {
                if (arr[i][b].type != Game.EMPTY_TILE) {
                    if (i == 0) {
                        currentType = arr[i][b].type;
                        prevType = arr[i][b].type;
                    } else {
                        currentType = arr[i][b].type;

                        //trace("prevType: " + prevType + " currentType: " + currentType);

                        if (currentType == prevType) {
                            count++;
                        } else {
                            count = 1;
                        }
                        prevType = currentType;
                    }

                    if (count == 3) {
                        win = true;
                        //trace("WIN!");

                        winners.push({
                            "x": i - 2,
                            "y": b
                        });
                        winners.push({
                            "x": i - 1,
                            "y": b
                        });
                        winners.push({
                            "x": i,
                            "y": b
                        });


                    }
                    if (count > 3) {
                        winners.push({
                            "x": i,
                            "y": b
                        })
                    }
                }

            }
            //winners = checkIfBricksStillFlying(winners);
        }
        return win;
    }
}