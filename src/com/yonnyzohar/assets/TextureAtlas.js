var TextureAtlas = {
    dict: {},
    atlas: null,
    assetsPath: "bin/bejewledJS.json",
    init: function () {
        PIXI.loader.add(TextureAtlas.assetsPath).load(function () {
            trace("ATLAS LOADED " + TextureAtlas.assetsPath);
            atlas = PIXI.loader.resources[TextureAtlas.assetsPath].textures;
            GlobalEventDispatcher.getInstance().dispatchEvent("ASSETS_LOADED");
        });

    },

    createFrame: function (itemName) {
        trace(itemName);

        var image = new PIXI.Sprite(atlas[itemName]);
        if (image == null) {
            trace("could not create " + itemName)
        }
        return image;
    },



    createMovieClip: function (itemName) //:starling.display.MovieClip 
        {
            trace("itemName: " + itemName);
            trace(atlas.getTextures(itemName));
            return new MovieClip(atlas.getTextures(itemName), 30);
        }
}