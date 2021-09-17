var JumpersPool = {
    items: [],

    init: function () {
        for (var i = 0; i < 30; i++) {
            var scoreJumper = new ScoreJumper();
            items.push(scoreJumper);
        }
    },

    getSprite: function () {
        var symbolAvaliable = false;
        var current;
        var items = JumpersPool.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].parent == null) {
                trace("getting bg from pool");
                symbolAvaliable = true;
                current = items[i];
                break;
            }
        }

        if (!symbolAvaliable) {
            trace("getting new from pool");
            current = new ScoreJumper();
            items.push(current);
        }

        current.scale.x = 1;
        current.scale.y = 1;
        current.x = 0;
        current.y = 0;
        current.alpha = 1;
        current.visible = true;

        return current;
    },

    returnSprite: function (mc) {
        var items = JumpersPool.items;
        var i = items.indexOf(mc);

        if (i != -1) {
            if (mc.parent) {
                mc.parent.removeChild(mc);
            }
            items[i].scale.x = items[i].scale.y = 1;
            items[i].x = items[i].y = 0;
        }
    }
}