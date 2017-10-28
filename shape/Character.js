var drawerland = drawerland || {};

(function() {
    drawerland.Character = Character;
    var AbstractGridShape = drawerland.AbstractGridShape;

    function Character(grid, gridX, gridY){
        AbstractGridShape.call(this, grid, gridX, gridY);
        this.moveTo(this.gridX, this.gridY);
        this.drawShape();
    }

    Character.prototype = Object.create(AbstractGridShape.prototype);
    Character.prototype.constructor = Character;

    Character.prototype.drawShape = function() {
        this.graphics
            .beginFill("black")
            .drawCircle(0, 0, 20)
            .endFill();
    }
})();
