
var GlobalEventDispatcher = (function(){
    function GlobalEventDispatcher() {
        //do stuff
    }
	
	GlobalEventDispatcher.inheritsFrom(EventDispatcher);
	
    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new GlobalEventDispatcher();
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        }
   };
   	
   
})();
