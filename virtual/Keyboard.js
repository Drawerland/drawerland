var drawerland = drawerland || {};

(function() {
    drawerland.Keyboard = Keyboard;

    function Keyboard(game){
        this.game = game;
        const self = this;
        this.eventExecuter = function(event){
            array = self.game.map.getAdjacentBoxes(self.game.map.getGridBox(self.game.character.position.gridX,self.game.character.position.gridY));
            if(event.keyCode == 49) {//#1
                try{
                    if(!array[0].blocking && !array.selected){
                        for (var i = 0; i < array.length; i++) {array[i].unselect();}
                        array[0].select();
                    }
                }catch(e){console.error(e)}
            }
            else if(event.keyCode == 50) {//#2
                try{
                    if(!array[1].blocking && !array.selected){
                        for (var i = 0; i < array.length; i++) {array[i].unselect();}
                        array[1].select();
                    }
                }catch(e){console.error(e)}
            }
            else if(event.keyCode == 51) {//#3
                try{
                    if(!array[2].blocking && !array.selected){
                        for (var i = 0; i < array.length; i++) {array[i].unselect();}
                        array[2].select();
                    }
                }catch(e){console.error(e)}
            }
            else if(event.keyCode == 52) {//#4
                try{
                    if(!array[3].blocking && !array.selected){
                        for (var i = 0; i < array.length; i++) {array[i].unselect();}
                        array[3].select();
                    }
                }catch(e){console.error(e)}
            }
            else if(event.keyCode == 53) {//#5
                try{
                    if(!array[4].blocking && !array.selected){
                        for (var i = 0; i < array.length; i++) {array[i].unselect();}
                        array[4].select();
                    }
                }catch(e){console.error(e)}
            }
            else if(event.keyCode == 54) {//#6
                try{
                    if(!array[5].blocking && !array.selected){
                        for (var i = 0; i < array.length; i++) {array[i].unselect();}
                        array[5].select();
                    }
                }catch(e){console.error(e)}
            }
            self.game.update();
        }
    }




})();
