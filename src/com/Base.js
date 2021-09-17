function Base()
{
    console.log("BOB IS GODDDD!!!");

    var self = this;
    this.declareVar = function (id, element)
    {
        self[id] = element;
    }
    
}

Function.prototype.inheritsFrom = function (parentClassOrObject)
{
    if (parentClassOrObject.constructor == Function)
    {
        //Normal Inheritance 
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }
    else
    {
        //Pure Virtual Inheritance 
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
}

