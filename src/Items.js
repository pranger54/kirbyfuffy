var score = 0;
var Items = cc.Sprite.extend({
    
    ctor: function(){
        this._super();
    },

    update: function(dt){
        var pos = this.getPosition();
         this.setPosition(new cc.p(pos.x+5 ,pos.y)); 
        if(pos.x>=820){
        	this.setPosition(new cc.p(-5,pos.y));
        }
    },

     hit: function( kirby ) {
        var kirbyPos = kirby.getPosition();
        var mush2Pos = this.getPosition();
        
        return this.checkFruitCollision( kirbyPos.x, kirbyPos.y, mush2Pos.x, mush2Pos.y );
    },
    
    checkFruitCollision: function( kirbyPosx, kirbyPosy, mush2Posx, mush2Posy ) {
    	 if( mush2Posx >= kirbyPosx-20 && mush2Posx <= kirbyPosx+5  && mush2Posy <= kirbyPosy+5 && mush2Posy >= -3 ) {
            score++;
            this.setPosition( new cc.p(Math.floor(Math.random() * screenWidth),1200));
             console.log("crashm2")
        }
        return true;   
    }                      
});