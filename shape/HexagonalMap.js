var drawerland = drawerland || {};
(function(){
    drawerland.HexagonalMap = HexagonalMap;
    var Hexagon = drawerland.Hexagon;
    var math = drawerland.math;

    function HexagonalMap(grid){
        createjs.Container.call(this);
        this.grid = grid;
        //@TODO we should be able to use this.children (from Container) instead of our own hexagons array
        this.hexagons = [];
        this.debug = false;
        this.drawShape();
    }

    HexagonalMap.prototype = Object.create(createjs.Container.prototype);
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
        for (var edge = 0; edge < 6; edge++) {
            var adjacentCoord = gridShape.getGridAdjacent(edge);
            if(adjacentCoord !== null) {
                var adjacentHexagon = this.getGridHexagon(adjacentCoord.x, adjacentCoord.y);
                if (adjacentHexagon !== null) {
                    adjacents.push(adjacentHexagon);
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
            var hexagon = new Hexagon(this.grid, gridCoord.x, gridCoord.y);
            this.hexagons.push(hexagon);
            this.addChild(hexagon);

            if(this.debug){
                this.drawHexagonDebug(i, hexagon);
            }
        }

        var layout = new createjs.Shape();

        layout.graphics
            .beginStroke("#000")
            .drawRoundRect(0, 0, this.getWidth(), this.getHeight(), 5)
            .endStroke()
        ;

        this.addChild(layout);
    };

    HexagonalMap.prototype.drawHexagonDebug = function(index, hexagon){
        var debugString = '#' + index + ':' + hexagon.gridX + ',' + hexagon.gridY;
        var debugText = new createjs.Text(debugString, "12px Arial", "#ff7700");
        debugText.x = hexagon.x - 27;
        debugText.y = hexagon.y - 10;
        this.addChild(debugText);
    };
})();
