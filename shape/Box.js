var drawerland = drawerland || {};

(function(){
    drawerland.Box = Box;

    function Box(position, description) {
        createjs.Shape.call(this);
        this.position = position;
        var pixelCoordinates = this.position.getPixelCoordinates();
        this.x = pixelCoordinates.x;
        this.y = pixelCoordinates.y;
        this.decoration = description.decoration;
        this.adjacent = false;
        this.blocking = description.blocking || false;
        this.drawShape();
    }

    Box.prototype = Object.create(createjs.Shape.prototype);
    Box.prototype.constructor = Box;

    Box.prototype.setAdjacent = function(adjacent){
        this.adjacent = adjacent;
        this.drawShape();
    };

    Box.prototype.drawShape = function()
    {
        this.decoration.decorate(this.graphics)
            .beginStroke(createjs.Graphics.getRGB(0,0,0))
            .drawPolyStar(0,0, this.position.grid.distance / Math.sqrt(3), 6, 0, 30)
            .endStroke();


        if(this.adjacent && !this.blocking){
            this.graphics
                .beginFill(createjs.Graphics.getRGB(200,200,200, 0.40))
                .drawPolyStar(0,0, this.position.grid.distance / Math.sqrt(3), 6, 0, 30)
                .endFill();
        }
    };
})();
