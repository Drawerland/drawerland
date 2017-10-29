var drawerland = drawerland || {};

(function() {
    drawerland.GridPosition = GridPosition;
    var math = drawerland.math;

    function GridPosition(grid, gridX, gridY){
        this.grid       = grid;
        this.gridX      = gridX;
        this.gridY      = gridY;
    }

    GridPosition.prototype.getPixelCoordinates = function(){
        var pixelCoordinates = math.gridToPixel(this.gridX, this.gridY, this.grid.distance);
        pixelCoordinates.x += this.grid.offsetX;
        pixelCoordinates.y += this.grid.offsetY;
        return pixelCoordinates;
    };

    GridPosition.prototype.getGridAdjacent = function(edge){
        return math.gridAdjacent(this.gridX, this.gridY, edge, this.grid.lengthX);
    };

    GridPosition.prototype.getIndex = function(){
        return math.gridToIndex(this.gridX, this.gridY, this.grid.lengthX);
    };

    GridPosition.prototype.clone = function(){
        return new GridPosition(this.grid, this.gridX, this.gridY);
    };
})();
