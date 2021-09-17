function Timer() {
    PIXI.Container.call(this);

    var bg; //:Quad;
    var loader; //:Quad;
    var self = this;

    var w = Parameters.theStage.width;
    var h = 40;

    bg = getQuad(w, h, 0x653200);
    loader = getQuad(w - 2, h - 2, 0xF28A24);

    this.addChild(bg);
    this.addChild(loader);
    loader.x = 1;
    loader.y = 1;


    this.init = function (time) {
        self.stop();
        loader.scale.x = 0;
        TweenLite.from(self.scale, 0.5, {
            y: 0
        });
        TweenLite.to(loader.scale, time, {
            x: 1,
            ease: Linear.easeNone,
            onUpdate: updateMe,
            onComplete: runComp
        });
    }

    function updateMe() {

    }

    function runComp() {
        GlobalEventDispatcher.getInstance().dispatchEvent("TIME_UP");
    }

    this.stop = function () {
        TweenLite.killTweensOf(loader.scale);
    }
}

Timer.prototype = Object.create(PIXI.Container.prototype);