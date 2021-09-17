function Bg() {

    PIXI.Container.call(this);
    var shack; //Image;
    var cloud1; //Image;
    var cloud2; //Image;
    var speed1;
    var speed2;
    var sky; //:Quad;
    var grass; //:Quad;

    //var credits;//Image;


    shack = TextureAtlas.createFrame("shack");
    sky = getQuad(Parameters.theStage.width, Parameters.theStage.height, 0x00C5CA);
    grass = getQuad(Parameters.theStage.width, Parameters.theStage.height / 4, 0x80AA26);

    this.addChild(sky);
    this.addChild(grass);
    grass.y = Parameters.theStage.height - grass.height;



    cloud1 = TextureAtlas.createFrame("cloud1")
    cloud2 = TextureAtlas.createFrame("cloud2")

    this.addChild(cloud1);
    this.addChild(cloud2);

    cloud1.x = Parameters.theStage.width * Math.random();
    cloud2.x = Parameters.theStage.width * Math.random();

    cloud1.y = (Parameters.theStage.height / 4) * Math.random();
    cloud2.y = (Parameters.theStage.height / 4) * Math.random();

    speed1 = Math.random() * 10;
    speed2 = Math.random() * 10;

    this.addChild(shack);
    shack.scale.x = shack.scale.y = 0.8;
    shack.y = grass.y - shack.height + 10;
    shack.x = (Parameters.theStage.width - shack.width) / 2;


    this.update = function () {
        trace("update bg")
        cloud1.x += speed1 * 0.05;
        cloud2.x += speed2 * 0.05;

        if (cloud1.x > Parameters.theStage.width) {
            cloud1.x = -cloud1.width;
        }

        if (cloud2.x > Parameters.theStage.width) {
            cloud2.x = -cloud1.width;
        }

    }
}

Bg.prototype = Object.create(PIXI.Container.prototype);