var drawerland = drawerland || {};
(function(Shape, Container){
    drawerland.Map = Map;
    var GridPosition = drawerland.GridPosition;
    var Box = drawerland.Box;
    var math = drawerland.math;

    function Map(grid, defaultDecoration, descriptor){
        Container.call(this);
        this.grid = grid;
        this.defaultDecoration = defaultDecoration;
        this.descriptor = descriptor || {};
        this.selected = null;
        this.drawShape();
    }

    Map.prototype = Object.create(Container.prototype);
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

    Map.prototype.selectBox = function(obj){
        box = obj.box || this.getGridBox(obj.gridX,obj.gridY);
        try{this.selected.unselect()}catch(e){}
        box.select();
        this.selected = box;
    }

    Map.prototype.resetSelectBox = function(){
        this.selected.unselect();
        this.selected = null;
    }

    Map.prototype.getDescription = function(gridX, gridY){
        var key = gridX+','+gridY;
        if(typeof this.descriptor[key] !== 'undefined'){
            return this.descriptor[key];
        }
        return {
          'decoration': this.defaultDecoration
        };
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
            var description = this.getDescription(gridCoord.x, gridCoord.y);
            this.addChild(
                new Box(
                    new GridPosition(this.grid, gridCoord.x, gridCoord.y),
                    description
                )
            );
        }

        var layout = new Shape();

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
})(createjs.Shape, createjs.Container);
