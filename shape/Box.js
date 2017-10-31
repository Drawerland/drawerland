var drawerland = drawerland || {};

(function(Shape, Graphics){
    drawerland.Box = Box;

    function Box(position, description) {
        Shape.call(this);
        this.position = position;
        var pixelCoordinates = this.position.getPixelCoordinates();
        this.x = pixelCoordinates.x;
        this.y = pixelCoordinates.y;
        this.decoration = description.decoration;
        this.adjacent = false;
        this.blocking = description.blocking || false;
        this.drawShape();
    }

    Box.prototype = Object.create(Shape.prototype);
    Box.prototype.constructor = Box;

    Box.prototype.setAdjacent = function(adjacent){
        this.adjacent = adjacent;
        this.drawShape();
    };

    Box.prototype.drawShape = function()
    {
        //@TODO optionnal centered debug of positions on the center of each Boxes        ;
        this.decoration.decorate(this.graphics)
            .beginStroke(Graphics.getRGB(0,0,0))
            .drawPolyStar(0,0, this.position.grid.offsetX, 6, 0, 30)
            .endStroke()
            .endFill();


        if(this.adjacent && !this.blocking){
            this.graphics
                .beginFill(Graphics.getRGB(200,200,200, 0.40))
                .drawPolyStar(0,0, this.position.grid.offsetX, 6, 0, 30)
                .endFill();
        }
    };
})(createjs.Shape, createjs.Graphics);
