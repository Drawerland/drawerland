var drawerland = drawerland || {};
(function(){
    drawerland.HexagonalMap = HexagonalMap;
    var Hexagon = drawerland.Hexagon;
    var math = drawerland.math;

    function HexagonalMap(grid){
        createjs.Shape.call(this);
        this.grid = grid;
        this.hexagons = [];
        this.drawShape();
    }

    //TODO map should inherit from createjs.Container.prototype
    HexagonalMap.prototype = Object.create(createjs.Shape.prototype);
    HexagonalMap.prototype.constructor = HexagonalMap;

    HexagonalMap.prototype.getWidth = function(){
        return this.hexagons.length === 0
            ? 0
            : this.hexagons[this.hexagons.length-1].x + this.grid.offsetX;
    };

    HexagonalMap.prototype.getHeight = function(){
        return this.hexagons.length === 0
            ? 0
            : this.hexagons[this.hexagons.length-1].y + this.grid.offsetY;
    };

    HexagonalMap.prototype.getAdjacentHexagons = function(gridShape){
        var adjacents = [];
        var hexagon = this.getGridHexagon(gridShape.gridX, gridShape.gridY);
        if (hexagon !== null) {
            for (var edge = 0; edge < 6; edge++) {
                var adjacentCoord = hexagon.getGridAdjacent(edge);
                if(adjacentCoord) {
                    var adjacentHexagon = this.getGridHexagon(adjacentCoord.x, adjacentCoord.y);
                    if (adjacentHexagon !== null) {
                        adjacents.push(adjacentHexagon);
                    }
                }
            }
        }
        return adjacents;
    };

    HexagonalMap.prototype.getGridHexagon = function(gridX, gridY){
        var index = math.gridToIndex(gridX, gridY, this.grid.lengthX);
        if (index >= 0 && typeof this.hexagons[index] !== 'undefined') {
            return this.hexagons[index];
        }
        return null;
    };

    HexagonalMap.prototype.drawShape = function(){
        for (var i=0; i < this.grid.lengthX * this.grid.lengthY; i++){
            var gridCoord = math.indexToGrid(i, this.grid.lengthX);
            this.hexagons.push(new Hexagon(this.grid, gridCoord.x, gridCoord.y));
        }

        this.graphics
            .beginStroke("#000")
            .drawRoundRect(0, 0, this.getWidth(), this.getHeight(), 5)
            .endStroke()
        ;
    };
})();
