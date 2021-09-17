function GameButton(str, size, callback) {
    PIXI.Container.call(this);

    var tf; //:TextField;

    var BUTTON_CLICKED = "BUTTON_CLICKED";
    this.interactive = true;
    var btn = TextureAtlas.createFrame("buttonMC")
    this.addChild(btn);

    this.click = this.touchend = callback;
    var self = this;

    if (size == 0) {
        this.scale.x = this.scale.y = 0.5;
    } else {
        this.scale.x = this.scale.y = 0.7;
    }

    var fontName = "COOPERBLACKSTD";
    var fontSize = 50;
    var fontColor = 0x0000000;

    tf = new TextField(btn.width, btn.height, str, fontName, fontSize, fontColor);

    this.addChild(tf);
    tf.x = (btn.width - tf.width) / 2;
    tf.y = (btn.height - tf.height) / 2;

    this.removeButtonClickListener = function () {
        self.click = self.touchend = null;
    }

    this.addClickListener = function (callback) {
        self.click = self.touchend = callback;
    }

}
GameButton.prototype = Object.create(PIXI.Container.prototype);