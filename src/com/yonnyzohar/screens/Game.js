Game.GAME_CREATED = "gameCreated";
Game.TILE_SIZE = 150;

function Game(_stage) {

    PIXI.Container.call(this);
    var helperTimeOut;
    var EMPTY_TILE = 999;

    var clickCount = 0;

    var theStage;
    var boardManager;

    this.mouseClicked = false;

    var firstBrick;
    var secondBrick;
    var bgArr = [];

    var mouseClickable = true;

    //var boomArray:Array = new Array();

    var grid; //: Array;
    var frame; //Image;
    var levelObj; //: Object;

    //////////////////////

    var startI;
    var startJ;

    var endI;
    var endJ;
    var swipe;
    var self = this;

    //for touches!!!
    var initialPoint;
    var finalPoint;


    theStage = _stage;

    frame = TextureAtlas.createFrame("frame");

    this.interactive = true;

    this.init = function (_levelObj) {
        levelObj = _levelObj;
        grid = levelObj.grid;

        boardManager = new BoardManager(self);

        boardManager.setBricks(levelObj.brickTypes);

        createBG();
        fillBoard();
        boardManager.go();
        trace("init")

        self.touchstart = self.mousedown = onTouchStart;
        self.touchend = self.mouseupoutside = self.mouseup = self.touchendoutside = onTouchEnd;

    }

    this.removeBrick = function (brick) {
        BricksPool.returnSprite(brick);
        self.removeChild(brick);

        //boomArray.push(c);

        //Sounds.playSuccess();
        brick.playSound();
        //TO DO MAKE THIS WORK

        var c = BoomPool.getSprite();
        self.addChild(c);
        c.x = (brick.x + (Game.TILE_SIZE / 2)) - (c.width / 2);
        c.y = (brick.y + (Game.TILE_SIZE / 2)) - (c.height / 2);

        c.play(onShockWaveComplete);

        var tx = brick.transform.worldTransform.tx;
        var ty = brick.transform.worldTransform.ty;

        Parameters.globalPoint = {
            x: tx,
            y: ty
        };

        GlobalEventDispatcher.getInstance().dispatchEvent("COUNT_UP")
    }

    function onShockWaveComplete(shockWaveMC) {
        self.removeChild(shockWaveMC);
        BoomPool.returnSprite(shockWaveMC);
    }



    function killC(c) {
        removeChild(c);
        BoomPool.returnSprite(c);
    }

    function createBG() {
        trace("createBG");
        var bgTile;

        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[i].length; j++) {
                bgTile = BGTilePool.getSprite();
                bgTile.alpha = 1;
                self.addChild(bgTile);
                bgTile.y = Game.TILE_SIZE * i;
                bgTile.x = Game.TILE_SIZE * j;
                bgArr.push(bgTile);
            }
        }

        //clipRect = new Rectangle(0, 0, width, height);

        GlobalEventDispatcher.getInstance().dispatchEvent(Game.GAME_CREATED);

    }

    function fillBoard() {
        var i = 0;
        var j = 0;

        boardManager.bricks.splice(0);

        for (i = 0; i < grid.length; i++) {
            boardManager.bricks.push(new Array());

            for (j = 0; j < grid[i].length; j++) {
                var rnd = Math.floor(Math.random() * boardManager.brickTypes.length);

                boardManager.bricks[i][j] = rnd;
            }
        }

        var createdWinningBoard = MatchChecker.checkForMatch(boardManager.bricks);

        if (createdWinningBoard) {
            trace("created a winning board, need a losing one for starters!");
            fillBoard();
        } else {
            for (i = 0; i < grid.length; i++) {
                for (j = 0; j < grid[i].length; j++) {
                    var b = boardManager.brickTypes[boardManager.bricks[i][j]]
                    var brick = BricksPool.getSprite(b); //new Brick(b);
                    brick.type = boardManager.bricks[i][j];
                    boardManager.bricks[i][j] = brick;
                }
            }
            placeBricks();

        }
    }

    function placeBricks() {
        var count = 0.2;
        var i = 0;
        var j = 0;
        var brick;

        for (i = 0; i < grid.length; i++) {
            for (j = 0; j < grid[i].length; j++) {

                brick = boardManager.bricks[i][j];

                self.addChild(brick);
                brick.y = (Game.TILE_SIZE * i);
                brick.x = (Game.TILE_SIZE * j);

                brick.origX = brick.x;
                brick.origY = brick.y;
                brick.innerI = i;
                brick.innerJ = j;
                brick.oldY = brick.origY;

                //TweenLite.from(brick, count, {alpha:0});
                count += 0.2;
                //brick.addEventListener(TouchEvent.TOUCH, onClick);
            }
        }

    }

    function onTouchStart(interactionData) {
        initialPoint = interactionData.data.global;

        var sx;
        var sy;
        sx = initialPoint.x; // - self.x;
        sy = initialPoint.y; // + self.y;

        sx = parseInt(sx / self.scale.x);
        sy = parseInt((sy - self.y) / self.scale.y);

        startI = parseInt(sy / Game.TILE_SIZE);
        startJ = parseInt(sx / Game.TILE_SIZE);

        trace("initialPoint: " + initialPoint.x + "/" + initialPoint.y + " startI " + startI + " startJ " + startJ)

        if (boardManager != null) {
            if (boardManager.bricks[startI] != undefined) {
                if (boardManager.bricks[startI] != null) {
                    if (boardManager.bricks[startI][startJ] != undefined) {
                        if (boardManager.bricks[startI][startJ] != null) {
                            if (boardManager.bricks[startI][startJ] instanceof Brick) {
                                self.onBrickClicked(boardManager.bricks[startI][startJ]);
                            }
                        }
                    }
                }
            }
        }
    }

    function onTouchEnd(interactionData) {

        var ex;
        var ey;
        finalPoint = interactionData.data.global;


        ex = finalPoint.x; // - self.x;
        ey = finalPoint.y; // + self.y;

        ex = parseInt(ex / self.scale.x);
        ey = parseInt((ey - self.y) / self.scale.y);

        endJ = parseInt(ex / Game.TILE_SIZE);
        endI = parseInt(ey / Game.TILE_SIZE);

        trace("finalPoint: " + initialPoint.x + "/" + initialPoint.y + " endI " + endI + " endJ " + endJ)

        if (boardManager != null) {
            if (boardManager.bricks[endI] != undefined) {
                if (boardManager.bricks[endI] != null) {
                    if (boardManager.bricks[endI][endJ] != undefined) {
                        if (boardManager.bricks[endI][endJ] != null) {
                            if (boardManager.bricks[endI][endJ] instanceof Brick) {
                                self.onBrickClicked(boardManager.bricks[endI][endJ]);
                            }
                        }
                    }
                }
            }
        }

    }

    function onSwipeRec(interactionData) {

        finalPoint = interactionData.global;

        var swipeGesture = e.target;

        if (swipeGesture.offsetX > 6) {

            endI = startI;
            endJ = startJ + 1;
            trace("right - > endI: " + endI + " endJ: " + endJ);
        }

        if (swipeGesture.offsetX < -6) {

            endI = startI;
            endJ = startJ - 1;

            trace("left - > endI: " + endI + " endJ: " + endJ);
        }

        if (swipeGesture.offsetY > 6) {

            endI = startI + 1;
            endJ = startJ;
            trace("down - > endI: " + endI + " endJ: " + endJ);
        }

        if (swipeGesture.offsetY < -6) {

            endI = startI - 1;
            endJ = startJ;
            trace("up - > endI: " + endI + " endJ: " + endJ);
        }

        if (boardManager != null) {
            if (boardManager.bricks[endI] != undefined) {
                if (boardManager.bricks[endI] != null) {
                    if (boardManager.bricks[endI][endJ] != undefined) {
                        if (boardManager.bricks[endI][endJ] != null) {
                            if (boardManager.bricks[endI][endJ] instanceof Brick) {
                                self.onBrickClicked(boardManager.bricks[endI][endJ]);
                            }
                        }
                    }
                }
            }
        }
    }

    this.onBrickClicked = function (brickObj) {
        clearTimeout(helperTimeOut)

        ///kill tween
        for (var i = 0; i < boardManager.bricks.length; i++) {
            for (var j = 0; j < boardManager.bricks[i].length; j++) {
                if (boardManager.bricks[i][j] instanceof Brick) {
                    boardManager.bricks[i][j].stopAnim();
                }
            }
        }

        if (mouseClickable) {
            self.mouseClicked = true;

            trace("CLICK!!");

            if (clickCount == 0) {

                self.addChild(frame);

                frame.x = brickObj.origX;
                frame.y = brickObj.origY;

                firstBrick = brickObj;
                trace("clickCount: " + clickCount + " firstBrick: " + firstBrick);

                clickCount++;
                return;
            } else if (clickCount == 1) {
                secondBrick = brickObj;

                if (secondBrick == null || firstBrick == null) {
                    trace("null bitch!");
                    clickCount = 0;
                    return;
                }

                var firstOrigX = firstBrick.origX;
                var firstOrigY = firstBrick.origY;
                var firstI = firstBrick.innerI;
                var firstJ = firstBrick.innerJ;
                var firstType = firstBrick.type;

                var secondOrigX = secondBrick.origX;
                var secondOrigY = secondBrick.origY;
                var secondI = secondBrick.innerI;
                var secondJ = secondBrick.innerJ;
                var secondType = secondBrick.type;

                trace("clickCount: " + clickCount + " secondBrick: " + secondBrick);

                if (AdjecantChecker.isAdjacent(firstI, firstJ, secondI, secondJ)) {
                    trace("isAdjecant");
                    self.deactivateMouse();

                    if (legalMove(firstI, firstJ, secondI, secondJ)) {
                        trace("is legal move");

                        self.removeChild(frame);
                        TweenLite.to(firstBrick, 0.3, {
                            x: secondBrick.origX,
                            y: secondBrick.origY
                        });
                        TweenLite.to(secondBrick, 0.3, {
                            x: firstBrick.origX,
                            y: firstBrick.origY,
                            onComplete: finishedMoving
                        });
                    } else {
                        TweenLite.to(firstBrick, 0.2, {
                            x: secondBrick.origX,
                            y: secondBrick.origY
                        });
                        TweenLite.to(secondBrick, 0.2, {
                            x: firstBrick.origX,
                            y: firstBrick.origY,
                            onComplete: moveBack
                        });

                        function moveBack() {
                            TweenLite.to(firstBrick, 0.2, {
                                x: firstBrick.origX,
                                y: firstBrick.origY
                            });
                            TweenLite.to(secondBrick, 0.2, {
                                x: secondBrick.origX,
                                y: secondBrick.origY,
                                onComplete: self.activateMouse
                            });
                        }
                    }
                }

                clickCount = 0;
            }
        }
    }

    function finishedMoving() {
        if (firstBrick == null)
            return;
        if (secondBrick == null)
            return;
        var firstOrigX = firstBrick.origX;
        var firstOrigY = firstBrick.origY;
        var firstI = firstBrick.innerI;
        var firstJ = firstBrick.innerJ;
        var firstType = firstBrick.type;

        var secondOrigX = secondBrick.origX;
        var secondOrigY = secondBrick.origY;
        var secondI = secondBrick.innerI;
        var secondJ = secondBrick.innerJ;
        var secondType = secondBrick.type;

        firstBrick.origX = secondOrigX;
        firstBrick.origY = secondOrigY;
        firstBrick.innerI = secondI;
        firstBrick.innerJ = secondJ;
        firstBrick.type = secondType;

        secondBrick.origX = firstOrigX;
        secondBrick.origY = firstOrigY;
        secondBrick.innerI = firstI;
        secondBrick.innerJ = firstJ;
        secondBrick.type = firstType;

        boardManager.bricks[firstI][firstJ] = secondBrick;
        boardManager.bricks[secondI][secondJ] = firstBrick;
        self.mouseClicked = false;
        self.deactivateMouse();
        boardManager.go();

    }

    this.deactivateMouse = function () {
        clearTimeout(helperTimeOut)
        mouseClickable = false;
    }

    this.activateMouse = function () {
        mouseClickable = true;

        //add a timout for highlighting bricks here!!!
        helperTimeOut = setTimeout(findPossibleMatch, 10000);
    }

    function findPossibleMatch() {
        clearTimeout(helperTimeOut);

        var isMatch = PossibleMatchFinder.checkAllShapes(boardManager.traceAssets(), boardManager.brickTypes);

        if (isMatch) {
            var arrToWiggle = PossibleMatchFinder.possibleMatch;
            var b; //: Brick;

            for (var h = 0; h < arrToWiggle.length; h++) {
                b = boardManager.bricks[arrToWiggle[h].x][arrToWiggle[h].y];
                b.playAnim();

            }
        }
    }

    function legalMove(_firstI, _firstJ, _secondI, _secondJ) {
        var firstObj = boardManager.bricks[_firstI][_firstJ].type;
        var secondObj = boardManager.bricks[_secondI][_secondJ].type;

        boardManager.bricks[_firstI][_firstJ].type = secondObj;
        boardManager.bricks[_secondI][_secondJ].type = firstObj;

        var arr = boardManager.traceAssets();

        var ans = MatchChecker.checkForMatch(arr);

        if (!ans) {
            boardManager.bricks[_firstI][_firstJ].type = firstObj;
            boardManager.bricks[_secondI][_secondJ].type = secondObj;
        }

        return ans;
    }



    this.jumpOutAllBricks = function (i, j) {
        if (boardManager.bricks[i][j]) {
            var brick = boardManager.bricks[i][j];
            if (brick instanceof Brick) {
                BricksPool.returnSprite(brick);

                var middleX;

                if (Lobby.truck.x > brick.x) {
                    middleX = brick.x + ((Lobby.truck.x - brick.x) / 2)
                } else {
                    middleX = brick.x - ((brick.x - Lobby.truck.x) / 2)
                }



                var tx = brick.transform.worldTransform.tx;
                var ty = brick.transform.worldTransform.ty;

                var p = {
                    x: tx,
                    y: ty
                }
                Parameters.gameHolder.addChild(brick);

                brick.x = p.x;
                brick.y = p.y;
                brick.scale.x = brick.scale.y = self.scale.x;

                if (Lobby.truck != null) {

                    var time = 8 / boardManager.bricks.length;
                    TweenMax.to(brick, time, {
                        bezier: [{
                            x: middleX,
                            y: brick.y - 300
                        }, {
                            x: Lobby.truck.x - 50,
                            y: Lobby.truck.y + (Lobby.truck.height / 2)
                        }],
                        ease: Power1.easeInOut,
                        onComplete: function () {
                            Parameters.gameHolder.removeChild(brick)
                        }
                    });



                    // ease: Linear.easeNone,


                }

            }
        }

        setTimeout
            (
                function () {
                    j++;

                    if (j >= boardManager.bricks[0].length) {
                        j = 0;
                        i++;

                        if (i >= boardManager.bricks.length) {
                            return;
                        }
                    }

                    self.jumpOutAllBricks(i, j);

                }, 20 / boardManager.bricks.length)

    }

    this.killAll = function () {
        self.mouseClicked = true;
        kill();
    }

    function kill() {
        var brick = null;
        if (boardManager) {
            if (boardManager.bricks) {
                for (var i = 0; i < boardManager.bricks.length; i++) {
                    for (var j = 0; j < boardManager.bricks[i].length; j++) {
                        if (boardManager.bricks[i][j] instanceof Brick) {
                            brick = boardManager.bricks[i][j];
                            brick.stopAnim();
                            BricksPool.returnSprite(brick);
                            self.removeChild(brick);
                        }
                    }
                }
            }
        }

        if (bgArr) {
            for (i = 0; i < bgArr.length; i++) {
                bgArr[i].parent.removeChild(bgArr[i]);
                BGTilePool.returnSprite(bgArr[i]);
            }
        }

        clearTimeout(helperTimeOut)
        frame = null;
        theStage = null;
        boardManager = null;
        firstBrick = null;
        secondBrick = null;
        //boomArray = null;
        grid = null;
    }

}

Game.prototype = Object.create(PIXI.Container.prototype);