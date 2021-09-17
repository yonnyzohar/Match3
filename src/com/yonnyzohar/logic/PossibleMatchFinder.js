var PossibleMatchFinder = {
    possibleMatch: [],
    arr: null,
    currentNum: 0,
    shapes: [
    [
     [1, 0],
     [0, 0],
     [1, 0],
     [1, 0]
    ],
    [
     [1, 0],
     [1, 0],
     [0, 0],
     [1, 0]
    ],
    [
     [1, 0, 1, 1],
     [0, 0, 0, 0]
    ],
    [
     [1, 1, 0, 1],
     [0, 0, 0, 0]

    ],
    [
     [1, 0],
     [0, 1],
     [1, 0]
    ],
    [
     [0, 1],
     [1, 0],
     [0, 1]
    ],
    [
     [1, 0],
     [0, 1],
     [0, 1]
    ],
    [
     [0, 1],
     [1, 0],
     [1, 0]
    ],
    [
     [0, 1],
     [0, 1],
     [1, 0]
    ],
    [
     [1, 0],
     [1, 0],
     [0, 1]
    ],
    [
     [1, 0, 1],
     [0, 1, 0]
    ],
    [
     [0, 1, 0],
     [1, 0, 1]
    ],
    [
     [0, 1, 1],
     [1, 0, 0]
    ],
    [
     [1, 0, 0],
     [0, 1, 1]
    ],
    [
     [0, 0, 1],
     [1, 1, 0]
    ],
    [
     [1, 0, 0],
     [0, 1, 1]
    ]
   ],

    checkAllShapes: function (_arr, _brickTypes) {
        arr = _arr;
        var numsToCheck = [];
        var exists = false;
        var shapes = PossibleMatchFinder.shapes;

        for (var h = 0; h < _brickTypes.length; h++) {
            //var str= brickTypes[h];
            //str = str.substr(str.indexOf("l") +1);
            numsToCheck.push(h);
        }

        //trace("numsToCheck: " + numsToCheck);

        bigLoop: for (var j = 0; j < numsToCheck.length; j++) {
            currentNum = numsToCheck[j];
            for (var i = 0; i < shapes.length; i++) {
                //trace("checking for " + currentNum + " match in shape: " + i);
                exists = PossibleMatchFinder.checkForShape(shapes[i]);

                if (exists) {
                    break bigLoop;
                }
            }
        }

        return exists;
    },


    checkForShape: function (shape) {
        var i = 0;
        var j = 0;
        var exists = false;
        var possibleMatch = PossibleMatchFinder.possibleMatch;

        outerLoop:
            for (i = 0; i < arr.length; i++) {
                for (j = 0; j < arr[i].length; j++) {
                    //single shape!!!
                    possibleMatch = [];
                    var pass = 0;

                    for (var ii = 0; ii < shape.length; ii++) {
                        var passArr = [];

                        for (var jj = 0; jj < shape[0].length; jj++) {
                            if (arr[ii + i] != undefined) {
                                if (arr[ii + i][jj + j] != undefined) {
                                    passArr.push(arr[ii + i][jj + j]);

                                    //FUCKING WORKS!!!!!!
                                    if (arr[ii + i][jj + j] == currentNum && shape[ii][jj] == 1) {
                                        //grid[ ii + i ][jj + j] = 9;
                                        possibleMatch.push({
                                            x: ii + i,
                                            y: jj + j
                                        });
                                        pass++;
                                    }
                                }
                            }
                        }
                        //trace(passArr);
                    }

                    if (pass == 3) {
                        //this is where i can mark them later!!!!
                        /*for(var h= 0; h < tempArr.length; h++)
						{
							duplicate[tempArr[h].x][tempArr[h].y] = 9;
						}*/
                        PossibleMatchFinder.possibleMatch = possibleMatch;
                        trace("HOORAY");
                        exists = true;
                        break outerLoop;
                    }

                    //end single shape!!!
                    //trace("--");
                }
            }

        return exists;
    }
}