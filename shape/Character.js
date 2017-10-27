var drawerland = drawerland || {};

(function() {
    drawerland.Character = Character;
    function Character(){
        createjs.Shape.call(this);
        this.drawShape();
    }

    Character.prototype = new createjs.Shape();
    Character.prototype.constructor = Character;

    Character.prototype.moveToHexagon = function(hexagon) {
        this.x = hexagon.x;
        this.y = hexagon.y;
        this.drawShape();
    };

    Character.prototype.drawShape = function() {
        this.graphics
            .beginFill("black")
            .drawCircle(0, 0, 20)
            .endFill();
    }
})();
