var drawerland = drawerland || {};

(function(){
    drawerland.Hexagon = Hexagon;

    function Hexagon(x, y, distance, offsetX, offsetY, color) {
        createjs.Shape.call(this);
        this.repereX = x;
        this.repereY = y;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
        this.distance = distance;
        this.color = color || 'white';
        this.adjacent = false;
        this.drawShape();
    }

    Hexagon.prototype = new createjs.Shape();
    Hexagon.prototype.constructor = Hexagon;

    Hexagon.prototype.getX = function(){
        return this.offsetX + this.distance * (this.repereX + this.repereY / 2);
    };

    Hexagon.prototype.getY = function(){
        return this.offsetY + Math.sqrt(3) * this.distance * this.repereY / 2;
    };

    Hexagon.prototype.getRadius = function(){
        return this.distance / Math.sqrt(3);
    };

    Hexagon.prototype.setAdjacent = function(adjacent){
        this.adjacent = adjacent;
        this.drawShape();
    };

    Hexagon.prototype.drawShape = function()
    {
        //Give calculated x & y to parent Shape object
        this.x = this.getX();
        this.y = this.getY();

        this.graphics
            .beginFill(this.adjacent ? 'blue' : this.color)
            .beginStroke(createjs.Graphics.getRGB(0,0,0))
            .drawPolyStar(0,0, this.getRadius(), 6, 0, 30)
            .endFill();
    };
})();
