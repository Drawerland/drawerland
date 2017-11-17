var drawerland = drawerland || {};

(function() {
    drawerland.Keyboard = Keyboard;

    function Keyboard(game){
        this.game = game;
        const self = this;
        this.eventExecuter = function(event){

            function boxSelect(index){
                var array = self.game.map.getAdjacentBoxes(self.game.map.getGridBox(self.game.character.position.gridX,self.game.character.position.gridY));
                if (index < array.length){
                    if(!array[index].blocking && ~array.selected){
                        for (var i = 0; i < array.length; i++) {array[i].unselect();}
                        array[index].select();
                    }
                }
            }
            if(event.keyCode == 49) {//#1
                boxSelect(0);
            }
            else if(event.keyCode == 50) {//#2
                boxSelect(1);
            }
            else if(event.keyCode == 51) {//#3
                boxSelect(2);
            }
            else if(event.keyCode == 52) {//#4
                boxSelect(3);
            }
            else if(event.keyCode == 53) {//#5
                boxSelect(4);
            }
            else if(event.keyCode == 54) {//#6
                boxSelect(5);
            }
            self.game.update();
        }
    }




})();
