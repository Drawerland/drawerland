var drawerland = drawerland || {};

(function() {
    drawerland.Character = Character;

    function Character(position){
        createjs.Shape.call(this);
        this.position = position;
        this.moveTo(this.position);
        this.drawShape();
    }

    Character.prototype = Object.create(createjs.Shape.prototype);
    Character.prototype.constructor = Character;

    Character.prototype.drawShape = function() {
        this.graphics
            .beginFill("black")
            .drawCircle(0, 0, 20)
            .endFill();
    };

    Character.prototype.moveTo  = function(position){
        this.position = position;
        var pixelCoordinates = this.position.getPixelCoordinates();
        this.x = pixelCoordinates.x;
        this.y = pixelCoordinates.y;
    };
})();
