var drawerland = drawerland || {};

(function() {
    var square3 = Math.sqrt(3);
    drawerland.math = {
        'gridToPixel': function(gridX, gridY, distance){
            return {
                'x': distance * (gridX + gridY / 2),
                'y': square3 * distance * gridY /2
            };
        },
        'gridAdjacent': function(x, y, edge, lengthX){
            //edge 0 is left, others clockwise
            //TODO find pure math function
            var relativeX = x + Math.floor(y/2),
                oddY = y % 2,
                extremeLeft = relativeX === 0,
                extremeRight = relativeX === lengthX-1;
            switch(edge){
                case 0:
                    return extremeLeft
                        ? null
                        : {'x': x-1, 'y': y};
                case 1:
                    return extremeLeft && !oddY
                        ? null
                        : {'x': x, 'y': y-1};
                case 2:
                    return extremeRight && oddY
                        ? null
                        : {'x': x+1, 'y': y-1};
                case 3:
                    return extremeRight
                        ? null
                        : {'x': x+1, 'y': y};
                case 4:
                    return extremeRight && oddY
                        ? null
                        : {'x': x, 'y': y+1};
                case 5:
                    return extremeLeft && !oddY
                        ? null
                        : {'x': x-1, 'y': y+1};
                default:
                    throw new Error('Invalid edge #' + edge);
            }
        },
        'indexToGrid': function(index, lengthX){
            var y = Math.floor(index / lengthX);
            return {
                'x': index - (y * lengthX) - Math.floor(y/2),
                'y': y
            };
        },
        'gridToIndex': function(x, y, lengthX){
            return x + Math.floor(y/2) + ( y * lengthX );
        }
    };
})();
