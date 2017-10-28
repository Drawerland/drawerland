var drawerland = drawerland || {};

(function(){
    drawerland.AbstractGridShape = AbstractGridShape;
    var math = drawerland.math;

    function AbstractGridShape(grid, gridX, gridY) {
        createjs.Shape.call(this);
        this.gridX      = gridX || 0;
        this.gridY      = gridY || 0;
        this.grid       = grid;
    }

    AbstractGridShape.prototype = Object.create(createjs.Shape.prototype);
    AbstractGridShape.prototype.constructor = AbstractGridShape;

    AbstractGridShape.prototype.getPixelCoordinates = function(){
        return math.gridToPixel(this.gridX, this.gridY, this.grid.distance);
    };

    AbstractGridShape.prototype.getGridAdjacent = function(edge){
        return math.gridAdjacent(this.gridX, this.gridY, edge, this.grid.lengthX);
    };

    AbstractGridShape.prototype.getIndex = function(){
        return math.gridToIndex(this.gridX, this.gridY, this.grid.lengthX);
    };

    AbstractGridShape.prototype.moveTo = function(gridX, gridY){
        this.gridX = gridX;
        this.gridY = gridY;
        var pixelCoordinates = this.getPixelCoordinates(gridX, gridY);
        this.x = this.grid.offsetX + pixelCoordinates.x;
        this.y = this.grid.offsetY + pixelCoordinates.y;
    };
})();
