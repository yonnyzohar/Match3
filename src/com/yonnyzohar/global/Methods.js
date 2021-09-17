var Methods = 
{
	flickerBottomTexts : function(bottomText, bottomTextBG)
	{
		bottomText.visible = bottomTextBG.visible = false;
		setTimeout(function(){bottomText.visible = bottomTextBG.visible = true}, 500);
		setTimeout(function(){bottomText.visible = bottomTextBG.visible = false}, 1000);
		setTimeout(function(){bottomText.visible = bottomTextBG.visible = true}, 1500);
		setTimeout(function(){bottomText.visible = bottomTextBG.visible = false},2000);
		setTimeout(function(){bottomText.visible = bottomTextBG.visible = true}, 2500);
	}
}
