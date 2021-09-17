var BGTilePool = {

    items: [], //:Vector.<Image> = new Vector.<Image>();

    init: function () {
        for (var i = 0; i < 30; i++) {

            var t = TextureAtlas.createFrame("iconBG")
            BGTilePool.items.push(t);
        }
    },

    getSprite: function () {

        var items = BGTilePool.items;
        var symbolAvaliable = false;
        //var current:Quad;
        var current; //Image;

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
            //current = new starling.display.Quad(150, 150, 0x000000);
            current = TextureAtlas.createFrame("iconBG")
            items.push(current);
        }

        //current.gotoAndStop(1);
        current.scale.x = 1;
        current.scale.y = 1;
        current.x = 0;
        current.y = 0;
        current.alpha = 1;
        current.visible = true;

        return current;
    },

    returnSprite: function (mc) {
        var items = BGTilePool.items;
        var i = items.indexOf(mc);

        if (i != -1) {
            if (mc.parent) {
                mc.removeFromParent();
            }
            items[i].scale.x = items[i].scale.y = 1;
            items[i].x = items[i].y = 0;
        }
    }
}