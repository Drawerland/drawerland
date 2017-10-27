var drawerland = drawerland || {};
(function(){
    drawerland.HexagonalMap = HexagonalMap;
    var Hexagon = drawerland.Hexagon;

    function HexagonalMap(distance, lengthX, lengthY, offsetX, offsetY){
        this.distance = distance || 60;
        this.lengthX = lengthX || 8;
        this.lengthY = lengthY || 8;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;

        this.shapes = [this];
        this.drawShape();
    }

    HexagonalMap.prototype = new createjs.Shape();
    HexagonalMap.prototype.constructor = HexagonalMap;

    HexagonalMap.prototype.getWidth = function(){
        return this.shapes.length === 0
            ? 0
            : this.shapes[this.shapes.length-1].x + this.getOffsetX();
    };

    HexagonalMap.prototype.getHeight = function(){
        return this.shapes.length === 0
            ? 0
            : this.shapes[this.shapes.length-1].y + this.getOffsetY();
    };

    HexagonalMap.prototype.getOffsetX = function(){
        return this.distance/Math.sqrt(3);
    };

    HexagonalMap.prototype.getOffsetY = function(){
        return this.distance/Math.sqrt(3);
    };

    HexagonalMap.prototype.drawShape = function(){
        for (var y=0; y < this.lengthY; y++) {
            var roundedHalfY = Math.floor(y/2);
            for (var x=-roundedHalfY; x < -roundedHalfY+this.lengthX; x++) {
                this.shapes.push(new Hexagon(x, y, this.distance, this.getOffsetX(), this.getOffsetY()));
            }
        }

        this.graphics
            .beginStroke("#000")
            .drawRoundRect(this.offsetX, this.offsetY, this.getWidth(), this.getHeight(), 5)
            .endStroke()
        ;
    };
})();
