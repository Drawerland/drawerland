var drawerland = drawerland || {};

(function(){
    drawerland.Box = Box;

    function Box(position, color) {
        createjs.Shape.call(this);
        this.position = position;
        var pixelCoordinates = this.position.getPixelCoordinates();
        this.x = pixelCoordinates.x;
        this.y = pixelCoordinates.y;
        this.color = color || 'white';
        this.adjacent = false;
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
        this.graphics
            .beginFill(this.adjacent ? 'blue' : this.color)
            .beginStroke(createjs.Graphics.getRGB(0,0,0))
            .drawPolyStar(0,0, this.position.grid.distance / Math.sqrt(3), 6, 0, 30)
            .endFill();
    };
})();
