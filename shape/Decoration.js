var drawerland = drawerland || {};

(function(Matrix2D) {
    drawerland.Decoration = Decoration;
    function Decoration(grid, type, resource){
        this.type = type;
        this.grid = grid;
        this.resource = resource;
        this.initialize();
    }

    Decoration.prototype.initialize = function(){
        switch (this.type){
            case Decoration.types.IMAGE:
                //@TODO image loading is async, we should rerender after it was loaded
                //@TODO or use createjs/preload.js
                this.image = document.createElement('img');
                this.image.src = this.resource;
                break;
        }
    };

    Decoration.prototype.decorate = function(graphics){
        //@TODO use easeljs command system ( in order to combine decorations functionally )
        switch (this.type){
            case Decoration.types.COLOR:
                return graphics.beginFill(this.resource);
            case Decoration.types.IMAGE:
                return graphics
                    .beginBitmapFill(this.image, 'no-repeat', new Matrix2D(1,0,0,1,this.grid.distance/2*-1,this.grid.distance/2*-1));
            default:
                throw new Error('Unknown decoration type');
        }
    };

    Decoration.types = {
        'COLOR': 0,
        'IMAGE': 1
    };
})(createjs.Matrix2D);
