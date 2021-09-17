	 var BrickResetter = {


	     resetBricks: function (bricks) {
	         var i;
	         var j;
	         var brick;
	         var tempBricks = [];

	         //take out all bricks
	         for (i = 0; i < bricks.length; i++) {
	             for (j = 0; j < bricks[i].length; j++) {
	                 if (bricks[i]) {
	                     if (bricks[i][j].type != Game.EMPTY_TILE) {
	                         if (bricks[i][j] instanceof Brick) {
	                             tempBricks.push(bricks[i][j]);
	                         }
	                     }
	                 }
	                 bricks[i][j] = null;
	             }
	         }

	         //put them back in
	         for (i = 0; i < tempBricks.length; i++) {
	             brick = tempBricks[i];
	             bricks[brick.innerI][brick.innerJ] = brick;
	         }

	         //put e back in
	         for (i = 0; i < bricks.length; i++) {
	             for (j = 0; j < bricks[i].length; j++) {
	                 if (bricks[i][j] == null) {
	                     bricks[i][j] = {
	                         "type": Game.EMPTY_TILE
	                     };
	                 }
	             }
	         }

	         for (i = 0; i < bricks.length; i++) {
	             for (j = 0; j < bricks[i].length; j++) {
	                 if (bricks[i]) {
	                     if (bricks[i][j] instanceof Brick) {
	                         brick = bricks[i][j];

	                         brick.x = j * Game.TILE_SIZE;
	                         brick.y = i * Game.TILE_SIZE;
	                         brick.origX = brick.x;
	                         brick.origY = brick.y;
	                     }
	                 }
	             }
	         }

	         return bricks;
	     }

	 }