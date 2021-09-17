function BoardManager(_game) // extends EventDispatcher
    {
        this.bricks = [];
        this.brickTypes;
        var brickTypes;

        var game;

        var numOfFallingBricks = 0;
        var innerNumOfFallingBricks = 0;
        var speed = 0.15;

        var firstArr = [];
        var secondArr = [];
        var globalCounter = 0;

        var tweeners = [];
        var self = this;
        var bricks = this.bricks;



        game = _game;

        this.setBricks = function (_brickTypes) {
            self.brickTypes = _brickTypes;
            brickTypes = self.brickTypes;
        }


        this.go = function () {
            game.deactivateMouse();

            var changesMade = checkBoardState();

            if (changesMade) {
                trace("CHANGES MADE");
                bricks = BrickResetter.resetBricks(bricks);
                checkForMatches();
                trace("AFTER CHECK MATCHES");
                //bricks = BrickResetter.resetBricks(bricks);
                self.traceAssets();
            } else {
                trace("NO CHANGES MADE");
                game.activateMouse();
            }
        }



        function checkBoardState() {
            var i = 0;
            var j = 0;
            var arr = [];
            var changesMade = true;
            var len = bricks.length;
            for (i = 0; i < len; i++) {
                arr.push([]);
                var len1 = bricks[i].length;
                for (j = 0; j < len1; j++) {
                    if (bricks[i][j] instanceof Brick) {
                        arr[i][j] = bricks[i][j].type
                    } else {
                        arr[i][j] = Game.EMPTY_TILE;
                    }
                }
            }

            trace("===============================");

            for (i = 0; i < arr.length; i++) {
                trace(arr[i]);
            }

            if (globalCounter == 0) {
                firstArr.splice(0);
                secondArr.splice(0);
                var len = arr.length;
                for (i = 0; i < len; i++) {
                    var len1 = arr[i].length;
                    for (j = 0; j < len1; j++) {
                        firstArr.push(arr[i][j]);
                    }
                }

                globalCounter++;
            } else if (globalCounter == 1) {
                var len = arr.length;
                for (i = 0; i < len; i++) {
                    var len1 = arr[i].length;
                    for (j = 0; j < len1; j++) {
                        secondArr.push(arr[i][j]);
                    }
                }


                var identical = compareArrays(firstArr, secondArr);
                trace("identical: " + identical);
                globalCounter = 0;

                if (identical) {
                    changesMade = false;
                }
            }
            trace("changesMade: " + changesMade);

            return changesMade;
        }

        function compareArrays(needles, haystack) {
            var identical = true;
            trace("firstArr:  " + needles);
            trace("secondArr: " + haystack);
            var len = needles.length;
            for (var i = 0; i < len; i++) {
                if (needles[i] != haystack[i]) {
                    identical = false;
                    break;
                }
            }
            return identical;
        }

        function checkForMatches() {
            var i;
            var j;
            var brick;

            trace("going to check for matching bricks");
            var arr = GlobalMatchChecker.checkForMatch(bricks);

            if (arr.length != 0) {
                arr = DuplicateRemover.removeDuplicate(arr);
                numOfFallingBricks = arr.length;
                innerNumOfFallingBricks = 0;
                var len = arr.length
                for (i = 0; i < len; i++) {
                    if (bricks[arr[i].x][arr[i].y] instanceof Brick) {
                        brick = bricks[arr[i].x][arr[i].y];
                        bricks[arr[i].x][arr[i].y] = {
                            "type": Game.EMPTY_TILE
                        };
                        Parameters.popCount += 0.2;
                        game.removeBrick(brick);
                        brick = null;
                    }
                }
                trace("now check for more duplicates and remove them");
                checkForMatches();
                //prepareToDropBricks();
            } else {
                trace("prepare To DropBricks");
                setTimeout(prepareToDropBricks, 400);
                Parameters.popCount = 0;
            }


            //bricks = BrickResetter.resetBricks(bricks);
        }

        function prepareToDropBricks() {
            var i;
            var j;
            var len = bricks.length;
            for (i = len - 1; i >= 0; i--) {
                var len1 = bricks[i].length;
                for (j = len1 - 1; j >= 0; j--) {
                    if (bricks[i][j] instanceof Brick) {
                        bricks[i][j].oldY = bricks[i][j].origY;
                    }
                }

            }

            dropBricks();

        }



        function dropBricks() {
            var i;
            var j;
            var bricksToDrop = [];
            var blockMC;
            var len = bricks.length;
            for (i = len - 1; i >= 0; i--) {
                if (i != len - 1) {
                    var len1 = bricks[i].length;
                    for (j = len1 - 1; j >= 0; j--) {
                        if (bricks[i][j]) {
                            if (bricks[i][j] instanceof Brick) {
                                var block = bricks[i][j].type;
                                blockMC = bricks[i][j];

                                if (blockMC && bricks[i + 1][j].type == Game.EMPTY_TILE) {
                                    bricksToDrop.push(blockMC);
                                }
                            }
                        }
                    }
                }
            }


            for (i = 0; i < bricksToDrop.length; i++) {
                blockMC = bricksToDrop[i]

                while (bricks[blockMC.innerI + 1] && bricks[blockMC.innerI + 1][blockMC.innerJ].type == Game.EMPTY_TILE) {
                    blockMC.origY = blockMC.innerI * blockMC.height;
                    bricks[blockMC.innerI + 1][blockMC.innerJ] = blockMC;
                    bricks[blockMC.innerI][blockMC.innerJ] = {
                        "type": Game.EMPTY_TILE
                    };
                    blockMC.innerI = (blockMC.innerI + 1);
                    blockMC.y = blockMC.origY;
                }
            }

            if (bricksToDrop.length != 0) {
                trace("===========bricksDrop=============");
                self.traceAssets();
                trace("========================");
                dropBricks();
            } else {
                bricks = BrickResetter.resetBricks(bricks);


                NewBoardCreater.getInstance().addEventListener("NEW_BOARD_CREATED", fillGaps);
                NewBoardCreater.getInstance().getPlayableBoard(bricks, brickTypes);
            }
        }

        function fillGaps() {
            //we have to create random bricks in the "holes", then check if this gives us a pattern, if not - recreate!, if so- proceed!
            trace("GOT A GOOD BOARD!!!!");
            NewBoardCreater.getInstance().removeEventListener("NEW_BOARD_CREATED", fillGaps);
            var goodBoard = NewBoardCreater.getInstance().duplicate;

            numOfFallingBricks = 0
            var count = 0;
            var missingGems = [];
            var i = 0;
            var j = 0;
            var topCount = -1;

            for (i = 0; i < goodBoard.length; i++) {
                trace(goodBoard[i]);
            }



            for (i = bricks.length - 1; i >= 0; i--) {
                if (i != bricks.length - 1) {
                    for (j = bricks[i].length - 1; j >= 0; j--) {

                        //if (g.type == Game.EMPTY_TILE)
                        if (bricks[i][j] instanceof Brick) {

                        } else {
                            var rnd = goodBoard[i][j];

                            trace("rnd: " + rnd);
                            //Math.floor(Math.random() * brickTypes.length);
                            var b = brickTypes[rnd];

                            var brick = BricksPool.getSprite(b); //new Brick(b);

                            game.addChild(brick);
                            brick.type = rnd;
                            brick.oldY = brick.height * topCount;
                            brick.y = Game.TILE_SIZE * i;
                            brick.x = Game.TILE_SIZE * j;
                            brick.origX = brick.x;
                            brick.origY = brick.y;
                            brick.innerI = i;
                            brick.innerJ = j;
                            bricks[i][j] = brick;
                            //brick.addEventListener(TouchEvent.TOUCH, onBrickClicked);
                        }

                    }
                }
                topCount--;
            }

            tweenEverybody();
        }

        function onBrickClicked(e) {
            var end = e.getTouch(game, TouchPhase.ENDED);

            if (end) {
                game.onBrickClicked(Brick(e.currentTarget));
            }
        }

        function tweenEverybody() {
            var i = 0;
            var j = 0;
            var brick;


            tweeners.splice(0);

            for (i = 0; i < bricks.length; i++) {
                for (j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j] instanceof Brick) {
                        brick = bricks[i][j];

                        if (brick.oldY != brick.origY) {
                            tweeners.push(brick)
                        }
                    }
                }
            }

            if (tweeners.length == 0) {
                trace("tweeners enpty, going to reset everyone");
                resetEveryone();
            } else {
                for (i = 0; i < tweeners.length; i++) {
                    brick = tweeners[i];

                    var diff = (brick.origY - brick.oldY);
                    diff = (diff / Game.TILE_SIZE);
                    diff = Math.abs(diff)

                    numOfFallingBricks++;
                    //Linear.easeNone
                    //Linear.easeIn
                    //Bounce.easeOut
                    //
                    TweenLite.from(brick, (speed * diff), {
                        ease: Linear.easeIn,
                        y: brick.oldY,
                        onComplete: endAnim,
                        onCompleteParams: [brick]
                    });

                }
            }
        }

        function endAnim(brick) {
            brick.oldY = brick.origY;

            tweeners.splice(tweeners.indexOf(brick), 1);
            trace("endAnim tweeners length: " + tweeners.length);

            if (tweeners.length == 0) {
                if (game.mouseClicked == false) {
                    resetEveryone();
                }
            }
        }

        function resetEveryone() {
            var i = 0;
            var j = 0;
            var brick;

            for (i = 0; i < bricks.length; i++) {
                for (j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j] instanceof Brick) {
                        brick = bricks[i][j];
                        brick.oldY = brick.origY;
                    }
                }
            }

            self.go();
        }

        ///////////////////


        this.traceAssets = function () {
            var i = 0;
            var j = 0;
            var arr = [];

            for (i = 0; i < bricks.length; i++) {
                arr.push([]);

                for (j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j] instanceof Brick) {
                        arr[i][j] = bricks[i][j].type
                    } else {
                        arr[i][j] = Game.EMPTY_TILE;
                    }
                }
            }

            trace("===============================");

            for (i = 0; i < arr.length; i++) {
                trace(arr[i]);
            }

            return arr;
        }
    }