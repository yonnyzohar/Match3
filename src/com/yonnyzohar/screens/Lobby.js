function Lobby() {
    PIXI.Container.call(this);
    var wheel1; //Image;
    var wheel2; //Image;
    var tractor; //Image;

    var button; //GameButton;


    var rope1; //Image;
    var rope2; //Image;

    var truck; //Sprite;
    var moveTruck = false;
    var moveSpeed = 0.1;
    var logo; //Image;
    var logoScale;
    var fixed = false;
    var self = this;


    logo = TextureAtlas.createFrame("logo")

    wheel1 = TextureAtlas.createFrame("wheel")
    wheel2 = TextureAtlas.createFrame("wheel")
    tractor = TextureAtlas.createFrame("truck")

    this.addChild(logo);

    logoScale = Parameters.theStage.width / (logo.width);

    logo.scale.x = logo.scale.y = (logoScale * 0.7);
    logo.x = (Parameters.theStage.width - logo.width) / 2;
    logo.y = (Parameters.theStage.height * 0.05);


    truck = new PIXI.Container();

    truck.addChild(tractor);
    truck.addChild(wheel1);
    truck.addChild(wheel2);

    wheel1.anchor.x = 0.5;
    wheel1.anchor.y = 0.5;
    wheel2.anchor.x = 0.5;
    wheel2.anchor.y = 0.5;
    wheel1.x = 111;
    wheel1.y = 290;

    wheel2.x = 437;
    wheel2.y = 290;

    var truckScale = Parameters.theStage.width / truck.width;
    truck.scale.x = truck.scale.y = (truckScale * 0.9);

    this.addChild(truck);

    Lobby.truck = truck;




    if (button == null) button = new GameButton("PLAY GAME", 1, onBTNClicked);
    this.addChild(button);

    if (button.width > Parameters.theStage.width) {
        var scale = button.width / button.height;
        button.width = Parameters.theStage.width * 0.8;
        button.heigt *= scale;
    }

    button.y = Parameters.theStage.height / 4;
    button.x = (Parameters.theStage.width - button.width) / 2;
    this.addChild(button);


    function onBTNClicked(e) {
        trace("btton clicked!!!")
        moveTruck = true;
    }



    function boucneTruckUp() {
        TweenLite.to(tractor, 0.2, {
            y: tractor.y - 2,
            onComplete: boucneTruckDown
        });
    }

    function boucneTruckDown() {
        TweenLite.to(tractor, 0.2, {
            y: tractor.y + 2,
            onComplete: boucneTruckUp
        });

    }

    this.update = function () {

        if (moveTruck) {
            truck.x -= moveSpeed;
            wheel1.rotation -= moveSpeed * 0.05;
            wheel2.rotation -= moveSpeed * 0.05;

            if (!fixed) moveSpeed *= 1.05;

            if (truck.x + truck.width < -100) {
                moveTruck = false;
                TweenLite.killTweensOf(tractor);
                GlobalEventDispatcher.getInstance().dispatchEvent("TRUCK_DONE")
            }
        }
    }

    this.hide = function () {
        button.removeButtonClickListener();
        if (truck.parent) {
            truck.parent.removeChild(truck);
        }
        if (button.parent) {
            button.parent.removeChild(button);
        }
        if (logo.parent) {
            logo.parent.removeChild(logo);
        }
    }

    this.playTractor = function () {
        self.addChild(truck);
        boucneTruckUp();
        truck.x = Parameters.theStage.width;
        moveSpeed = Parameters.theStage.width * 0.005;
        fixed = true;
        moveTruck = true;
    }

    this.show = function () {
        moveTruck = false;
        moveSpeed = 0.1;
        fixed = false;
        self.placeTractor();
        button.addClickListener(onBTNClicked);
        self.addChild(truck);
        self.addChild(button);
        self.addChild(logo);
        boucneTruckUp();
    }

    this.placeTractor = function () {
        truck.y = (Parameters.theStage.height * 0.95) - truck.height;
        truck.x = (Parameters.theStage.width - truck.width) / 2;
    }

    self.placeTractor();
}

Lobby.prototype = Object.create(PIXI.Container.prototype);