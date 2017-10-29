var drawerland = drawerland || {};
(function(){
    drawerland.Map = Map;
    var GridPosition = drawerland.GridPosition;
    var Hexagon = drawerland.Hexagon;
    var math = drawerland.math;

    function Map(grid){
        createjs.Container.call(this);
        this.grid = grid;
        this.debug = false;
        this.drawShape();
    }

    Map.prototype = Object.create(createjs.Container.prototype);
    Map.prototype.constructor = Map;

    Map.prototype.getWidth = function(){
        return this.children.length === 0
            ? 0
            : this.children[this.children.length-1].x + this.grid.offsetX;
    };

    Map.prototype.getHeight = function(){
        return this.children.length === 0
            ? 0
            : this.children[this.children.length-1].y + this.grid.offsetY;
    };

    Map.prototype.getAdjacentHexagons = function(gridShape){
        var adjacents = [];
        for (var edge = 0; edge < 6; edge++) {
            var adjacentCoord = gridShape.position.getGridAdjacent(edge);
            if(adjacentCoord !== null) {
                var adjacentHexagon = this.getGridHexagon(adjacentCoord.x, adjacentCoord.y);
                if (adjacentHexagon !== null) {
                    adjacents.push(adjacentHexagon);
                }
            }
        }
        return adjacents;
    };

    Map.prototype.getGridHexagon = function(gridX, gridY){
        var index = math.gridToIndex(gridX, gridY, this.grid.lengthX);
        if (index >= 0 && typeof this.children[index] !== 'undefined') {
            return this.children[index];
        }
        return null;
    };

    Map.prototype.drawShape = function(){
        for (var i=0; i < this.grid.lengthX * this.grid.lengthY; i++){
            var gridCoord = math.indexToGrid(i, this.grid.lengthX);
            var hexagon = new Hexagon(new GridPosition(this.grid, gridCoord.x, gridCoord.y));
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

    Map.prototype.drawHexagonDebug = function(index, hexagon){
        var debugString = '#' + index + ':' + hexagon.gridX + ',' + hexagon.gridY;
        var debugText = new createjs.Text(debugString, "12px Arial", "#ff7700");
        debugText.x = hexagon.x - 27;
        debugText.y = hexagon.y - 10;
        this.addChild(debugText);
    };
})();
