var drawerland = drawerland || {};

(function(Stage){
    drawerland.Game = Game;
    var Grid = drawerland.Grid;
    var GridPosition = drawerland.GridPosition;
    var Decoration = drawerland.Decoration;
    var Map = drawerland.Map;
    var Character = drawerland.Character;
    var Box = drawerland.Box;

    function Game(width, height, lengthX, lengthY, distance) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width || 800;
        this.canvas.height = height || 800;
        Stage.call(this, this.canvas);

        this.grid = new Grid(lengthX || 16, lengthY || 16, distance || 60);

        var rockDecoration = new Decoration(this.grid, Decoration.types.COLOR, '#724c05');
        var mapDescriptor = {
            '0,1': {
                'decoration': rockDecoration,
                'blocking': true
            },
            '0,2': {
                'decoration': rockDecoration,
                'blocking': true
            },
            '0,3': {
                'decoration': rockDecoration,
                'blocking': true
            },
            '0,4': {
                'decoration': rockDecoration,
                'blocking': true
            }
        };
        this.character = new Character(new GridPosition(this.grid, 0, 0));
        this.map = new Map(
            this.grid,
            new Decoration(this.grid, Decoration.types.COLOR, '#ffffff'),
            mapDescriptor
        );

        this.addChild(this.map);
        this.addChild(this.character);

        this.setCharacterAdjacent(true);
        this.update();

        var self = this;
        this.addEventListener('click', function(event){
            if(event.target instanceof Box && event.target.adjacent && !event.target.blocking){
                //self.setCharacterAdjacent(false);
                //self.character.moveTo(event.target.position.clone());
                //self.setCharacterAdjacent(true);
                event.target.select();



                self.update();
            }
        });
        this.enableMouseOver(20);
        this.addEventListener("mouseover",function(event){
            if(event.target instanceof Box && !event.target.blocking){
                event.target.hightlight(self);
                self.update();
            }
        });
    }

    Game.prototype = Object.create(Stage.prototype);
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
})(createjs.Stage);
