var drawerland = drawerland || {};
(function(){
    drawerland.Map = Map;
    var GridPosition = drawerland.GridPosition;
    var Box = drawerland.Box;
    var math = drawerland.math;

    function Map(grid){
        createjs.Container.call(this);
        this.grid = grid;
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

    Map.prototype.getAdjacentBoxes = function(gridShape){
        var adjacents = [];
        for (var edge = 0; edge < 6; edge++) {
            var adjacentCoord = gridShape.position.getGridAdjacent(edge);
            if(adjacentCoord !== null) {
                var adjacentBox = this.getGridBox(adjacentCoord.x, adjacentCoord.y);
                if (adjacentBox !== null) {
                    adjacents.push(adjacentBox);
                }
            }
        }
        return adjacents;
    };

    Map.prototype.getGridBox = function(gridX, gridY){
        var index = math.gridToIndex(gridX, gridY, this.grid.lengthX);
        if (index >= 0 && typeof this.children[index] !== 'undefined') {
            return this.children[index];
        }
        return null;
    };

    Map.prototype.drawShape = function(){
        for (var i=0; i < this.grid.lengthX * this.grid.lengthY; i++){
            var gridCoord = math.indexToGrid(i, this.grid.lengthX);
            var box = new Box(new GridPosition(this.grid, gridCoord.x, gridCoord.y));
            this.addChild(box);

            if(this.debug){
                this.drawBoxDebug(i, box);
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

    // Map.prototype.drawBoxDebug = function(index, box){
    //     var debugString = '#' + index + ':' + box.gridX + ',' + box.gridY;
    //     var debugText = new createjs.Text(debugString, "12px Arial", "#ff7700");
    //     debugText.x = box.x - 27;
    //     debugText.y = box.y - 10;
    //     this.addChild(debugText);
    // };
})();
