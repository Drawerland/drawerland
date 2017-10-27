var drawerland = drawerland || {};

(function(){
    drawerland.Game = Game;
    var HexagonalMap = drawerland.HexagonalMap;
    var Character = drawerland.Character;

    function Game(width, height){
        this.canvas = document.createElement('canvas');
        this.canvas.width = width || 800;
        this.canvas.height = height || 800;
        createjs.Stage.call(this, this.canvas);

        this.distance = 60;
        this.map = new HexagonalMap(this.distance, 16, 16);
        this.character = new Character();
        this.character.moveToHexagon(this.map.hexagons[15]);
        this.addShapes(this.map.hexagons.concat([this.map, this.character]));
        this.getAdjacentHexagons(this.character).forEach(function(hexagon){
            hexagon.setAdjacent(true);
        });
        this.update();

        var self = this;
        this.map.hexagons.forEach(function(hexagon){
            hexagon.addEventListener('click', function(){
                if (hexagon.adjacent) {
                    self.getAdjacentHexagons(self.character).forEach(function(hexagon){
                        hexagon.setAdjacent(false);
                    });
                    self.character.moveToHexagon(hexagon);
                    self.getAdjacentHexagons(self.character).forEach(function(hexagon){
                        hexagon.setAdjacent(true);
                    });
                    self.update();
                }
            });
        });
    }

    Game.prototype = new createjs.Stage();
    Game.prototype.constructor = Game;

    Game.prototype.attach = function(element){
        element.appendChild(this.canvas);
    };

    Game.prototype.addShapes = function(shapes){
        var self = this;
        shapes.forEach(function(shape){
            self.addChild(shape);
        });
    };

    Game.prototype.getAdjacentHexagons = function(shape){
        var self = this;
        return this.map.hexagons.filter(function(hexagon){
            return self.isAdjacent(shape, hexagon);
        });
    };

    Game.prototype.isAdjacent = function(shape, hexagon){
        return hexagon.x >= (shape.x - this.distance -1 )
            && hexagon.x <= (shape.x + this.distance +1 )
            && hexagon.y >= (shape.y - this.distance -1 )
            && hexagon.y <= (shape.y + this.distance +1 );
    };
})();
