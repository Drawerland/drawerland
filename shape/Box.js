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
        this.selected = false;
        this.hightlighted = false;
        this.blocking = description.blocking || false;
        this.drawShape();
    }


    Box.prototype = Object.create(Shape.prototype);
    Box.prototype.constructor = Box;



    Box.prototype.hightlight = function(game,stat,addEvent){
        stat = stat || !this.hightlighted;
        this.hightlighted = stat;
        this.drawShape();
        var self = this;
        if (addEvent){
            this.addEventListener("mouseout",function(event){
                self.hightlight(game,false);
                game.update();
                event.remove();
            });
        }
    };

    Box.prototype.select = function(){
        this.selected = true;
        this.drawShape();
    }
    Box.prototype.unselect = function(){
        this.selected = false;
        this.drawShape();
    }



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

        if(this.hightlighted && !this.blocking){
            this.graphics
                .beginFill(Graphics.getRGB(255,200,0,0.40))
                .drawPolyStar(0,0, this.position.grid.offsetX, 6, 0, 30)
                .endFill();
        }
        if(this.adjacent && !this.blocking){
            this.graphics
                .beginFill(Graphics.getRGB(0,0,0, 0.40))
                .drawPolyStar(0,0, this.position.grid.offsetX, 6, 0, 30)
                .endFill();
        }
        if(this.selected){
            this.graphics
                .beginFill(Graphics.getRGB(0,255,0, 0.40))
                .drawPolyStar(0,0, this.position.grid.offsetX, 6, 0, 30)
                .endFill();
        }
    };
})(createjs.Shape, createjs.Graphics);
