function EventDispatcher() {
    //Base.apply(this);

    this._listeners = {};

    Base.call(this);
}

EventDispatcher.inheritsFrom(Base);

EventDispatcher.prototype = {
    // constructor: EventDispatcher,

    addEventListener: function (eventName, func) {
        if (typeof this._listeners[eventName] === "undefined") {
            this._listeners[eventName] = [];
        }

        if (this._listeners[eventName].indexOf(func) == -1) {
            this._listeners[eventName].push(func);
        } else {
            // alert("FUNCTION ALREDY EXISTS!")
        }


    },

    dispatchEvent: function (eventName) {


        if (this._listeners[eventName] instanceof Array) {
            var listeners = this._listeners[eventName];
            var func = null;
            for (var i = 0, len = listeners.length; i < len; i++) {
                func = listeners[i];
                if (func) {
                    func.call(this);
                } else {
                    var bob = 5;
                }


            }
        }
    },

    removeEventListener: function (eventName, func) {
        if (this._listeners[eventName] instanceof Array) {
            var listeners = this._listeners[eventName];

            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === func) {
                    listeners.splice(i, 1);
                    trace("REMOVED LISTENER!!");
                    break;
                }
            }
        }
    }
};