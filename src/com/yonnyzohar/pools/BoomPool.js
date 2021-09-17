var BoomPool = {

    items: [],
    counter: 0,
    type: null,


    init: function (_type, len) {
        BoomPool.counter = len;
        BoomPool.type = _type;

        for (var i = 0; i < BoomPool.counter; i++) {
            var t = new ShockWave();
            //t.stop();
            BoomPool.items.push(t);
        }
    },


    getSprite: function () {
        var symbolAvaliable = false;
        var current; //:ShockWave;
        var items = BoomPool.items;

        for (var i = 0; i < items.length; i++) {
            if (items[i].inUse == false) {
                symbolAvaliable = true;
                current = items[i];
                break;
            }
        }

        if (!symbolAvaliable) {
            current = new ShockWave();
            items.push(current);
        }

        current.scale.x = 1;
        current.x = 0;
        current.y = 0;
        current.scale.y = 1;
        current.alpha = 1;
        current.visible = true;
        current.pivotX = current.width * 0.5;
        current.pivotY = current.height * 0.5;
        current.inUse = true;

        return current;
    },

    returnSprite: function (mc) {
        var items = BoomPool.items;
        var i = items.indexOf(mc);

        if (i != -1) {
            items[i].scale.x = items[i].scale.y = 1;
            items[i].x = items[i].y = 0;
            items[i].inUse = false;
        }
    }
}