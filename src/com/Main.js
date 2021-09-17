function Main() {
    PIXI.Container.call(this);
    //[Embed(source="../COOPERBLACKSTD.OTF", embedAsCFF="false", fontFamily="COOPERBLACKSTD", fontWeight="bold")]
    //  const ArialBold:;

    var self = this;
    var timerMC; //:Timer;
    var topText; //:TextField;
    var bottomText; //:TextField;

    var topTextBG; //:TextField;
    var bottomTextBG; //:TextField;

    var game; //:Game;
    var level = 1;

    var bg; //:Bg;
    var counter = 0;
    var totalCount;
    var lobby; //:Lobby;
    var backToLobbyBTN; //;//GameButton;


    GlobalEventDispatcher.getInstance().addEventListener("ASSETS_LOADED", onAsstesLoaded)
    TextureAtlas.init();



    function onAsstesLoaded(e) {
        GlobalEventDispatcher.getInstance().removeEventListener("ASSETS_LOADED", onAsstesLoaded)
            //Sounds.init();
        BGTilePool.init();
        BoomPool.init("shockWaveCircle_", 20);


        bg = new Bg();
        self.addChild(bg);

        trace("theStage: " + Parameters.theStage);

        loadLobby();
        createAllTexts();

    }

    function loadLobby() {
        if (timerMC) {
            timerMC.stop();
        }

        if (!lobby) {
            lobby = new Lobby();

        }
        if (backToLobbyBTN) {
            backToLobbyBTN.removeButtonClickListener();
            backToLobbyBTN.visible = false;
            self.removeChild(backToLobbyBTN);
        }

        disposeGame();

        self.removeChild(topTextBG);
        self.removeChild(bottomTextBG);
        self.removeChild(bottomText);
        self.removeChild(topText);
        self.addChild(lobby);
        lobby.show();
        GlobalEventDispatcher.getInstance().addEventListener("TRUCK_DONE", onBeginGame);

    }

    function onBeginGame(e) {
        GlobalEventDispatcher.getInstance().removeEventListener("TRUCK_DONE", onBeginGame);
        lobby.hide();
        startGame();

    }

    function startGame() {
        var levelObj = Levels.getLevelStats(level);

        if (levelObj.count == undefined) {
            level = 1;
            loadLobby();

            return;
        }

        topText.bold = true;
        bottomText.bold = true;
        topTextBG.bold = true;
        bottomTextBG.bold = true;

        self.addChild(topTextBG);
        self.addChild(bottomTextBG);

        topTextBG.x = topText.x + 3;
        topTextBG.y = topText.y + 3;

        topText.text = "LEVEL: " + level;
        topTextBG.text = "LEVEL: " + level;
        self.addChild(topText);

        totalCount = levelObj.count;
        counter = 0;

        if (backToLobbyBTN == null) {
            backToLobbyBTN = new GameButton("BACK TO LOBBY", 0, onBackTLobby);
            if (backToLobbyBTN.width > Parameters.theStage.width * 0.8) {
                var scale = backToLobbyBTN.width / backToLobbyBTN.height;
                backToLobbyBTN.width = Parameters.theStage.width * 0.5;
                backToLobbyBTN.heigt *= scale;
            }
        } else {
            backToLobbyBTN.addClickListener(onBackTLobby);
        }

        self.addChild(backToLobbyBTN);

        backToLobbyBTN.y = topText.y + topText.height + 10;
        backToLobbyBTN.x = (Parameters.theStage.width - backToLobbyBTN.width) / 2;
        backToLobbyBTN.visible = true;



        if (game) {
            trace("HOLY SHIT!!!")
        } else {
            game = new Game(Parameters.theStage);
        }

        GlobalEventDispatcher.getInstance().addEventListener(Game.GAME_CREATED, addMask);
        GlobalEventDispatcher.getInstance().addEventListener("COUNT_UP", countUp);
        game.init(levelObj);

        self.addChild(game);

        bottomText.text = counter + "/" + totalCount;
        bottomTextBG.text = counter + "/" + totalCount;
        self.addChild(bottomText);
        bottomText.y = game.y + game.height + 40;

        bottomTextBG.x = bottomText.x + 3;
        bottomTextBG.y = bottomText.y + 3;
    }

    function createAllTexts() {
        var fontName = "COOPERBLACKSTD";
        fontName = "Arial";

        topText = new TextField(Parameters.theStage.width, Parameters.theStage.height / 8, "", fontName, Parameters.theStage.height / 15, 0xffcc00);

        bottomText = new TextField(Parameters.theStage.width, Parameters.theStage.height / 8, "", fontName, Parameters.theStage.height / 20, 0xffcc00);

        topTextBG = new TextField(Parameters.theStage.width, Parameters.theStage.height / 8, "", fontName, Parameters.theStage.height / 15, 0x000000);
        bottomTextBG = new TextField(Parameters.theStage.width, Parameters.theStage.height / 8, "", fontName, Parameters.theStage.height / 20, 0x000000);

        bottomText.x = Parameters.theStage.width * 0.35;

    }

    this.update = function (e) {
        if (lobby) {
            lobby.update();
        }
        if (bg) {
            bg.update();
        }

    }


    function addMask(e) {
        GlobalEventDispatcher.getInstance().removeEventListener(Game.GAME_CREATED, addMask);
        game.x = 0;
        game.y = 0;

        if (Parameters.theStage.height > Parameters.theStage.width) {
            if (game.width < Parameters.theStage.width) {
                enlargeAssetW(game.width, game.width, 1, 1);
            } else {
                shrinkAssetW(game.width, game.width, 1, 1);
            }
        } else {
            if (game.height < Parameters.theStage.height) {
                enlargeAssetH(game.height, game.height, 1, 1);
            } else {
                shrinkAssetH(game.height, game.height, 1, 1);
            }
        }



        game.x = (Parameters.theStage.width - game.width) / 2;
        game.y = (Parameters.theStage.height - game.height) / 2;

        //, onComplete:rollOutTractor
        TweenLite.from(game, 1, {
            alpha: 0,
            onComplete: addTimer
        });


        /*var myMask = new PIXI.Graphics();
        myMask.beginFill();
        myMask.drawRect(0, 0, game.width, game.height);
        myMask.endFill();

        self.addChild(myMask);
        myMask.x = game.x;
        myMask.y = game.y;

        game.mask = myMask*/


    }

    function addTimer() {
        if (game == null)
            return;
        if (timerMC == null)
            timerMC = new Timer();
        GlobalEventDispatcher.getInstance().addEventListener("TIME_UP", onTimeUp);
        timerMC.init(Levels.getLevelStats(level).time);
        self.addChild(timerMC);
        timerMC.y = game.y + game.height;

    }

    function onTimeUp() {
        GlobalEventDispatcher.getInstance().removeEventListener("TIME_UP", onTimeUp);
        //Sounds.playFail();
        game.touchable = false;
        backToLobbyBTN.visible = false;
        Methods.flickerBottomTexts(bottomText, bottomTextBG);


        GlobalEventDispatcher.getInstance().removeEventListener("COUNT_UP", countUp);
        game.killAll();
        setTimeout(endKillFormFail, 2000);

    }

    function endKillFormFail(e) {
        disposeGame();
        startGame();
    }

    function shrinkAssetW(_origW, _w, sX, sY) {
        if (_w > Parameters.theStage.width) {
            sX -= 0.05;
            sY -= 0.05;
            _w = _origW * sX;
            shrinkAssetW(_origW, _w, sX, sY);
        } else {
            game.scale.x = sX;
            game.scale.y = sY;
        }
    }

    function shrinkAssetH(_origH, _h, sX, sY) {
        if (_h > Parameters.theStage.height) {
            sX -= 0.05;
            sY -= 0.05;
            _h = _origH * sX;
            shrinkAssetH(_origH, _h, sX, sY);
        } else {
            game.scale.x = sX;
            game.scale.y = sY;
        }
    }

    function enlargeAssetW(_origW, _w, sX, sY) {
        if (_w < Parameters.theStage.width) {
            sX += 0.05;
            sY += 0.05;
            _w = _origW * sX;

            enlargeAssetW(_origW, _w, sX, sY);
        } else {
            game.scale.x = sX;
            game.scale.y = sY;
        }
    }

    function enlargeAssetH(_origH, _h, sX, sY) {
        if (_h < Parameters.theStage.height) {
            sX += 0.05;
            sY += 0.05;
            _h = _origH * sX;

            enlargeAssetH(_origH, _h, sX, sY);
        } else {
            game.scale.x = sX;
            game.scale.y = sY;
        }
    }

    function countUp(e = null) {
        counter++;
        bottomText.text = counter + "/" + totalCount;
        bottomTextBG.text = counter + "/" + totalCount;

        var jumper = JumpersPool.getSprite();
        jumper.show();

        if (counter >= totalCount) {
            backToLobbyBTN.visible = false;
            timerMC.stop();
            rollOutTractor();
        }
    }

    function rollOutTractor() {

        game.touchable = false;
        self.addChild(lobby);
        GlobalEventDispatcher.getInstance().removeEventListener("TIME_UP", onTimeUp);
        GlobalEventDispatcher.getInstance().addEventListener("TRUCK_DONE", onTrackTorGone);
        lobby.playTractor();

        setTimeout
            (
                function () {
                    game.jumpOutAllBricks(0, 0);
                    //Sounds.playCheers();
                }, 1000);
    }

    function onTrackTorGone(e) {
        GlobalEventDispatcher.getInstance().removeEventListener("TRUCK_DONE", onTrackTorGone);
        //lobby.dispose();
        if (game) {
            game.killAll();

        }
        endKill();
    }

    function onBackTLobby(e) {
        //Sounds.stopSound();

        game.killAll();
        disposeGame();
        loadLobby();

    }

    function disposeGame() {
        if (game != null) {
            GlobalEventDispatcher.getInstance().removeEventListener(Game.ALL_ASSETS_REMOVED, disposeGame);
            GlobalEventDispatcher.getInstance().removeEventListener("COUNT_UP", countUp);
            GlobalEventDispatcher.getInstance().removeEventListener(Game.ALL_ASSETS_REMOVED, endKillFormFail);
            GlobalEventDispatcher.getInstance().removeEventListener(Game.GAME_CREATED, addMask);
            self.removeChild(game);
            game = null;
            trace("DONE DISPOSING GAME" + game)
        }

        if (timerMC != null) {
            self.removeChild(timerMC);
            GlobalEventDispatcher.getInstance().removeEventListener("TIME_UP", onTimeUp);
        }


    }

    function endKill(e) {
        disposeGame();
        level++;
        startGame();
    }

}

Main.prototype = Object.create(PIXI.Container.prototype);