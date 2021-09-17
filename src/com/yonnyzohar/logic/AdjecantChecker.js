	 var AdjecantChecker = {

	     isAdjacent: function (row1, col1, row2, col2) {
	         return Math.abs(row1 - row2) + Math.abs(col1 - col2) == 1
	     }

	 }