function BlockMovementChecker() {



    function checkMovement(bricks) {
        var i;
        var j;
        var blocksDoneMoving = true;

        //take out all bricks
        var len = bricks.length;
        for (i = 0; i < len; i++) {
            var len1 = bricks[i].length;
            for (j = 0; j < len1; j++) {
                if (bricks[i]) {
                    if (bricks[i][j].type == Game.EMPTY_TILE) {

                    } else {
                        if (bricks[i][j] instanceof Brick) {
                            if (bricks[i][j].inMovement) {
                                blocksDoneMoving = false;
                                break;
                            }
                        }
                    }
                }
            }
        }

        return blocksDoneMoving;
    }

}