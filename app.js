(function(){
    function Hexagon(x, y, distance)
    {
        createjs.Shape.call(this);
        this.repereX = x;
        this.repereY = y;
        this.distance = distance;
        this.drawShape();
    }

    Hexagon.prototype = new createjs.Shape();
    Hexagon.prototype.constructor = Hexagon;

    Hexagon.prototype.getShapeCoordinates = function()
    {
        var racine3 = Math.sqrt(3);
        return {
            x: 50 + this.distance * (this.repereX + this.repereY / 2),
            y: 50 +  racine3 * this.distance * this.repereY / 2 ,
            radius: this.distance / racine3
        };
    };

    Hexagon.prototype.drawShape = function()
    {
        var shapeCoordinates = this.getShapeCoordinates();

        //Give calculated x & y to parent Shape object
        this.x = shapeCoordinates.x;
        this.y = shapeCoordinates.y;

        var color = this.repereX % 2
            ? this.repereY % 2
                ? 'white'
                : 'blue'
            : this.repereY % 2
                ? 'black'
                : 'red';

        this.graphics
            .beginFill(color)
            .beginStroke(createjs.Graphics.getRGB(0,0,0))
            .drawPolyStar(0,0, shapeCoordinates.radius, 6, 0, 30)
            .endFill();
    };

    function HexagonalMap(width, height, distance, lengthX, lengthY)
    {
        this.distance = distance || 60;
        this.lengthX = lengthX || 8;
        this.lengthY = lengthY || 8;

        this.canvas = document.createElement('canvas');
        this.canvas.width = width || 800;
        this.canvas.height = height || 800;
        createjs.Stage.call(this, this.canvas);

        for (var y=0; y < this.lengthY; y++) {
            var roundedHalfY = Math.floor(y/2);
            for (var x=-roundedHalfY; x < -roundedHalfY+this.lengthX; x++) {
                this.addChild(new Hexagon(x, y, this.distance));
            }
        }
    }

    HexagonalMap.prototype = new createjs.Stage();
    HexagonalMap.prototype.constructor = HexagonalMap;

    HexagonalMap.prototype.attach = function(element){
        element.appendChild(this.canvas);
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        var map = new HexagonalMap(800, 800, 60, 12, 12);
        map.attach(document.body);
        map.update();
    });
})();
