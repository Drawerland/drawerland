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
        this.update();

        var self = this;
        this.map.hexagons.forEach(function(hexagon){
            hexagon.addEventListener('click', function(){
                if(self.isXAdjacent(hexagon) && self.isYAdjacent(hexagon)) {
                    self.character.moveToHexagon(hexagon);
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

    Game.prototype.isXAdjacent = function(hexagon){
        if (hexagon.x > this.character.x) {
            if((hexagon.x - this.character.x) < this.distance) {
                return true;
            }
        }

        if (hexagon.x < this.character.x) {
            if((this.character.x - hexagon.x) < this.distance) {
                return true;
            }
        }

        return false;
    };

    Game.prototype.isYAdjacent = function(hexagon){
        if (hexagon.y > this.character.y) {
            if((hexagon.y - this.character.y) < this.distance) {
                return true;
            }
        }

        if (hexagon.y < this.character.y) {
            if((this.character.y - hexagon.y) < this.distance) {
                return true;
            }
        }

        return false;
    };
})();
