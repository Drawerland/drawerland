var drawerland = drawerland || {};

(function() {
    drawerland.Grid = Grid;
    function Grid(lengthX, lengthY, distance){
        this.lengthX    = lengthX || 16;
        this.lengthY    = lengthY || 16;
        this.distance   = distance || 60;
        this.offsetX    = this.distance/Math.sqrt(3);
        this.offsetY    = this.distance/Math.sqrt(3);
    }
})();
