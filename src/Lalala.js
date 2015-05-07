var Lalala =  Monster.extend({

    ctor: function(){
        this.super();
        this.initWithFile('res/images/Lalala.png');
        },
        
    update: function(dt){
        var pos = this.getPosition();
        this.vx = -7;
        this.setPosition(pos.x-this.vx,pos.y);
        },
        
        effect: function(player){
            this.player.loseHeart();
        }
        
    });
        
        
        
        