var drawerland = drawerland || {};

(function(){
    var Decoration = drawerland.Decoration;

    drawerland.Hightlight = Hightlight;
    function Hightlight(){
        this.box = function (tile, grid) {
            tile.decoration = new Decoration(grid,Decoration.types.COLOR,"#ff0000");
            tile.drawShape();
            console.log(tile);
        }
    }




})();
