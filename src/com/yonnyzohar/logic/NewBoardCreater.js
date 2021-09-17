var NewBoardCreater = (function () {
    function NewBoardCreater() {
        var brickTypes;
        this.duplicate = [];
        var self = this;

        function traceDuplicate() {
            var i = 0;
            var j = 0;

            for (i = 0; i < self.duplicate.length; i++) {
                trace(self.duplicate[i]);

            }

        }


        this.getPlayableBoard = function (bricks, _brickTypes) {
            brickTypes = _brickTypes;

            //first create a self.duplicate of the array
            self.duplicate = [];
            var i = 0;
            var j = 0;

            for (i = 0; i < bricks.length; i++) {
                self.duplicate.push([]);

                for (j = 0; j < bricks[i].length; j++) {
                    if (bricks[i][j] instanceof Brick) {
                        self.duplicate[i].push(bricks[i][j].type);
                    } else {
                        self.duplicate[i].push(Math.floor(Math.random() * brickTypes.length));
                    }
                }
            }


            trace("-Duplicate:");
            traceDuplicate();
            trace("---");

            var playAbleBoard = PossibleMatchFinder.checkAllShapes(self.duplicate, _brickTypes);

            if (!playAbleBoard) {
                trace("CREATING NEW BOARD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                self.getPlayableBoard(bricks, brickTypes);
            } else {
                self.dispatchEvent("NEW_BOARD_CREATED")
            }
        }
    }

    NewBoardCreater.inheritsFrom(EventDispatcher);

    var instance;
    return {
        getInstance: function () {
            if (instance == null) {
                instance = new NewBoardCreater();
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
    };

})();