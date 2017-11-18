var drawerland = drawerland || {};

(function() {
    drawerland.Keyboard = Keyboard;

    function Keyboard(game){
        this.game = game;
        const self = this;
        this.eventExecuter = function(event){
            event.preventDefault();

            function boxSelect(index){
                var charpos = self.game.character.position;
                var array = self.game.map.getAdjacentBoxes(self.game.map.getGridBox(charpos.gridX,charpos.gridY));
                if (index < array.length){
                    if(!array[index].blocking && !array[index].selected){
                        self.game.map.selectBox({box:array[index]});
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
            else if(event.keyCode == 32) {//Space
                if (self.game.map.selected){
                    self.game.setCharacterAdjacent(false);
                    self.game.character.moveTo(self.game.map.selected.position.clone());
                    self.game.map.resetSelectBox();
                    self.game.setCharacterAdjacent(true);
                }

            }
            self.game.update();
        }
    }




})();
