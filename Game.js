var drawerland = drawerland || {};

(function(){
    drawerland.Game = Game;
    var Grid = drawerland.Grid;
    var HexagonalMap = drawerland.HexagonalMap;
    var Character = drawerland.Character;
    var Hexagon = drawerland.Hexagon;

    function Game(width, height, lengthX, lengthY, distance){
        this.canvas = document.createElement('canvas');
        this.canvas.width = width || 800;
        this.canvas.height = height || 800;
        createjs.Stage.call(this, this.canvas);

        this.grid = new Grid(lengthX || 16, lengthY || 16, distance || 60);

        this.character = new Character(this.grid, 0, 0);
        this.map = new HexagonalMap(this.grid);


        this.addShapes([this.map]);
        this.addShapes(this.map.hexagons);
        this.addShapes([this.character]);

        this.setCharacterAdjacent(true);
        this.update();

        var self = this;
        this.addEventListener('click', function(event){
            if(event.target instanceof Hexagon && event.target.adjacent){
                self.setCharacterAdjacent(false);
                self.character.moveTo(event.target.gridX, event.target.gridY);
                self.setCharacterAdjacent(true);
                self.update();
            }
        });
    }

    Game.prototype = Object.create(createjs.Stage.prototype);
    Game.prototype.constructor = Game;

    Game.prototype.attach = function(element){
        element.appendChild(this.canvas);
    };

    Game.prototype.setCharacterAdjacent = function(adjacent){
        this.map.getAdjacentHexagons(this.character)
            .forEach(function(hexagon){
                hexagon.setAdjacent(adjacent);
            });
    };

    Game.prototype.addShapes = function(shapes){
        var self = this;
        shapes.forEach(function(shape){
            self.addChild(shape);
        });
    };
})();
