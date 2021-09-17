function Brick(_spName) {

    PIXI.Container.call(this);

    var origX;
    var origY;
    var innerI;
    var innerJ;
    var type;
    var inMovement = false;
    var amount;
    var oldY;
    var innerAnim; //Image;
    var inUse = false;
    var spName;
    var self = this;


    spName = _spName;
    innerAnim = TextureAtlas.createFrame(spName)

    this.addChild(innerAnim);



    this.playAnim = function () {
        tweenOut();
    }

    function tweenOut() {
        self.playSound();
        TweenLite.to(innerAnim.scale, 0.5, {
            x: 1.2,
            y: 1.2
        });
        TweenLite.to(innerAnim, 0.5, {
            x: -20,
            y: -20,
            onComplete: tweenIn
        })
    }

    function tweenIn() {
        TweenLite.to(innerAnim.scale, 0.5, {
            x: 1,
            y: 1
        });
        TweenLite.to(innerAnim, 0.5, {
            x: 0,
            y: 0,
            onComplete: tweenOut
        })
    }

    this.stopAnim = function () {
        TweenLite.killTweensOf(innerAnim.scale);
        TweenLite.killTweensOf(innerAnim);
        innerAnim.scale.x = 1;
        innerAnim.scale.y = 1;
        innerAnim.x = 0;
        innerAnim.y = 0;
        //Sounds.stopSound();
    }

    this.playSound = function () {
        // Sounds.playSound(spName);

    }
}

Brick.prototype = Object.create(PIXI.Container.prototype);