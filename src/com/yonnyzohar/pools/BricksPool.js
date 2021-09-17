var BricksPool = {
    dict: {},
    getSprite: function (_type) {
        var dict = BricksPool.dict;
        var b;
        var symbolAvaliable = false;

        if (dict[_type] == undefined) {
            dict[_type] = new Array();
            b = new Brick(_type);
            dict[_type].push(b);
        } else {
            for (var i = 0; i < dict[_type].length; i++) {
                if (dict[_type][i].inUse == false) {
                    symbolAvaliable = true;
                    b = dict[_type][i];
                    trace("GTO BRICK FROM POOL!!!!");
                    break;
                }
            }

            if (!symbolAvaliable) {
                b = new Brick(_type);
                dict[_type].push(b);
            }
        }


        b.scale.x = 1;
        b.x = 0;
        b.y = 0;
        b.scale.y = 1;
        b.alpha = 1;
        b.visible = true;
        b.inUse = true;

        return b;

    },
    returnSprite: function (mc) {
        mc.inUse = false;
    }
}