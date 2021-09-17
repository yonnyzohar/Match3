function ScoreJumper() {
    PIXI.Container.call(this);

    var bottom; //:TextField;
    var top; //:TextField;
    var self = this;

    top = new TextField(100, 40, "", "COOPERBLACKSTD", 30, 0xffffff);
    bottom = new TextField(100, 40, "", "COOPERBLACKSTD", 30, 0x653200);


    bottom.bold = true;
    top.bold = true;

    self.addChild(bottom);
    self.addChild(top);

    top.x = bottom.x + 3;
    top.y = bottom.y + 3;

    touchable = false;

    this.show = function () {
        bottom.text = "+1";
        top.text = "+1";

        self.x = Parameters.globalPoint.x;
        self.y = Parameters.globalPoint.y;
        Parameters.gameHolder.addChild(self);
        TweenLite.to(self, 0.2 + (Parameters.popCount * 1.5), {
            y: self.y - 50,
            onComplete: JumpersPool.returnSprite,
            onCompleteParams: [self]
        })


    }

    function addMe() {

    }

}

ScoreJumper.prototype = Object.create(PIXI.Container.prototype);