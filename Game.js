var drawerland = drawerland || {};

(function(){
    drawerland.Game = Game;
    var Grid = drawerland.Grid;
    var GridPosition = drawerland.GridPosition;
    var Map = drawerland.Map;
    var Character = drawerland.Character;
    var Box = drawerland.Box;

    function Game(width, height, lengthX, lengthY, distance){
        this.canvas = document.createElement('canvas');
        this.canvas.width = width || 800;
        this.canvas.height = height || 800;
        createjs.Stage.call(this, this.canvas);

        this.grid = new Grid(lengthX || 32, lengthY || 32, distance || 30);

        this.character = new Character(new GridPosition(this.grid, 0, 0));
        this.map = new Map(this.grid);

        this.addChild(this.map);
        this.addChild(this.character);

        this.setCharacterAdjacent(true);
        this.update();

        var self = this;
        this.addEventListener('click', function(event){
            if(event.target instanceof Box && event.target.adjacent){
                self.setCharacterAdjacent(false);
                self.character.moveTo(event.target.position.clone());
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
        this.map.getAdjacentBoxes(this.character)
            .forEach(function(box){
                box.setAdjacent(adjacent);
            });
    };
})();
