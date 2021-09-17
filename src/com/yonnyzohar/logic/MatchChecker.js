var MatchChecker = {
    checkForMatch: function (arr) {
        var isBingo = false;
        var horizontalWin = MatchChecker.checkHorizontalWin(arr);
        var verticallWin = MatchChecker.checkVerticalWin(arr);
        //var diagonalLtrWin= checkDiagonalLtrWin(arr);
        //var diagonalRtlWin= checkDiagonalRtlWin(arr);

        if (horizontalWin || verticallWin) {
            isBingo = true;
        }

        return isBingo;

    },



    checkHorizontalWin: function (arr) {
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
                if (j == 0) {
                    currentType = arr[i][j];
                    prevType = arr[i][j];
                } else {
                    currentType = arr[i][j];

                    if (currentType == prevType) {
                        count++;
                    } else {
                        count = 1;
                    }
                    prevType = currentType;
                }

                if (count == 3) {
                    win = true;
                }
            }
        }
        return win;
    },

    checkVerticalWin: function (arr) {
        var count = 1;
        var j = 0;
        var win = false;
        var currentType;
        var prevType;


        //check vertical win
        for (var i = 0; i < arr.length; i++) {
            count = 1;
            for (j = 0; j < arr[0].length; j++) {
                if (j == 0) {
                    currentType = arr[j][i];
                    prevType = arr[j][i];
                } else {
                    currentType = arr[j][i];

                    if (currentType == prevType) {
                        count++;
                    } else {
                        count = 1;
                    }
                    prevType = currentType;
                }

                if (count == 3) {
                    win = true;
                }

            }
        }
        return win;
    }
}