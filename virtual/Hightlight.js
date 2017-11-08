var drawerland = drawerland || {};

(function(){
    var Decoration = drawerland.Decoration;

    drawerland.Hightlight = Hightlight;
    function Hightlight(){

        this.hightlightedBox = [];
        const self = this;
        this.box = function (tile, grid) {
            if (!tile.hightlighted){
                var d = new Date();
                tile.hightlighted = true;
                tile.hightlightExp = d.getTime() + 1000;
                self.hightlightedBox.push(tile);
            }else{tile.hightlightExp = d.getTime() + 1000;}
            tile.drawShape();
        }
        this.update = function(event){
            var d = new Date();
            for (var i = 0; i < self.hightlightedBox.length; i++) {
                var box = self.hightlightedBox[i];
                var t = d.getTime();
                if(t > box.hightlightExp){
                    console.log(t + " > " + d.getTime());
                    box.hightlighted = false;
                    box.drawShape();
                    self.hightlightedBox.splice(self.hightlightedBox.indexOf(box),1);
                }
            }
        }
    }
})();
