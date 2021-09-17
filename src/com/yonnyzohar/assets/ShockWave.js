function ShockWave() {
    PIXI.Container.call(this);

    var mc;
    var inUse = false;

    var frames = [];
    var self = this;

    for (var i = 0; i < 14; i++) {
        var val = i < 10 ? '0' + i : i;

        // magically works since the spritesheet was loaded with the pixi loader
        frames.push(PIXI.Texture.fromFrame('shockWave00' + val));
    }
    if (PIXI.extras.AnimatedSprite) {
        trace("AnimatedSprite is defined!")
        mc = new PIXI.extras.AnimatedSprite(frames);
        mc.loop = false;
        self.addChild(mc);
    }


    this.play = function (_fnctn) {
        self.fnctn = _fnctn;
        mc.loop = false;
        mc.onComplete = onAnimComplete;
        mc.gotoAndPlay(0);
    }

    function onAnimComplete() {
        self.fnctn(self);
        mc.onComplete = null;
        self.fnctn = null;
    }





    /*function movieCompletedHandler(e) {
        Starling.juggler.remove(mc);
        mc.stop();
        mc.removeEventListener(Event.COMPLETE, movieCompletedHandler);
        dispatchEvent(new Event("MOVIE_COMPLETE"))
    }*/
}

ShockWave.prototype = Object.create(PIXI.Container.prototype);