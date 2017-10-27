var drawerland = drawerland || {};

(function(){
    drawerland.Game = Game;
    var HexagonalMap = drawerland.HexagonalMap;

    function Game(width, height){
        this.canvas = document.createElement('canvas');
        this.canvas.width = width || 800;
        this.canvas.height = height || 800;
        createjs.Stage.call(this, this.canvas);
        this.map = new HexagonalMap(60, 16, 16);
        this.addShapes(this.map.shapes);
        this.update();
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
