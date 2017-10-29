var drawerland = drawerland || {};

(function() {
    drawerland.Decoration = Decoration;
    function Decoration(type, resource){
        this.type = type;
        this.resource = resource;
        this.initialize();
    }

    Decoration.prototype.initialize = function(){
        switch (this.type){
            case Decoration.types.IMAGE:
                this.image = document.createElement('img');
                this.image.src = this.resource;
                break;
        }
    };

    Decoration.prototype.decorate = function(graphics){
        switch (this.type){
            case Decoration.types.COLOR:
                return graphics.beginFill(this.resource);
            case Decoration.types.IMAGE:
                return graphics.beginBitmapFill(this.image);
            default:
                throw new Error('Unknown decoration type');
        }
    };

    Decoration.types = {
        'COLOR': 0,
        'IMAGE': 1
    };
})();
