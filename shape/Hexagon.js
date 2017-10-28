var drawerland = drawerland || {};

(function(){
    drawerland.Hexagon = Hexagon;
    var AbstractGridShape = drawerland.AbstractGridShape;

    function Hexagon(grid, gridX, gridY, color) {
        AbstractGridShape.call(this, grid, gridX, gridY);
        this.moveTo(this.gridX, this.gridY);
        this.color = color || 'white';
        this.adjacent = false;
        this.drawShape();
    }

    Hexagon.prototype = Object.create(AbstractGridShape.prototype);
    Hexagon.prototype.constructor = Hexagon;

    Hexagon.prototype.setAdjacent = function(adjacent){
        this.adjacent = adjacent;
        this.drawShape();
    };

    Hexagon.prototype.drawShape = function()
    {
        this.graphics
            .beginFill(this.adjacent ? 'blue' : this.color)
            .beginStroke(createjs.Graphics.getRGB(0,0,0))
            .drawPolyStar(0,0, this.grid.distance / Math.sqrt(3), 6, 0, 30)
            .endFill();
    };
})();
