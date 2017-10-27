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

        this.map = new HexagonalMap(60, 16, 16);
        this.character = new Character();
        this.character.moveToHexagon(this.map.hexagons[15]);
        this.addShapes(this.map.hexagons.concat([this.map, this.character]));
        this.update();

        var self = this;
        this.map.hexagons.forEach(function(hexagon){
            hexagon.addEventListener('click', function(){
                self.character.moveToHexagon(hexagon);
                self.update();
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
    }
})();
