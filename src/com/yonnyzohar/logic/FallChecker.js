
	 function FallChecker()
	{

		
		  function checkFallDistance(brick, bricks)
		{
			var numFall= 0;
			var innerI= brick.innerI;
			var innerJ= brick.innerJ;
			
			trace("innerI: " + innerI);
			trace("innerJ: " + innerJ);
			
			for (var i= 0; i < bricks.length - 1; i++)
			{
				if (bricks[innerI + i] != undefined)
				{
					if (bricks[innerI + i][innerJ] != -1)
					{
						if (bricks[innerI + i][innerJ].type == Game.EMPTY_TILE)
						{
							trace("bricks[innerI + i][innerJ]: " + bricks[innerI + i][innerJ]);
							numFall++;
						}
						
					}
				}
			}
			
			return numFall;
		}
	}

