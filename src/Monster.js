var life = 5;

var Monster = cc.Sprite.extend({
    ctor: function(){
        this._super();
    },

    
    update: function(dt){
        var pos = this.getPosition();
         this.setPosition(new cc.p(pos.x ,pos.y-5));      
     if( pos.y <= -30 ) {
       this.setPosition(new cc.p(Math.random()*1200,1200));
        }
    },
    
     hit: function( kirby ) {
        var kirbyPos = kirby.getPosition();
        var efreetiPos = this.getPosition();
        
        return this.checkFruitCollision( kirbyPos.x, kirbyPos.y, efreetiPos.x, efreetiPos.y );
    },
    
    checkFruitCollision: function( kirbyPosx, kirbyPosy, efreetiPosx, efreetiPosy ) {
        if( efreetiPosx >= kirbyPosx-40 && efreetiPosx <= kirbyPosx+10  && efreetiPosy <= kirbyPosy+10 && efreetiPosy >= 0 ) {
             life--;
             this.setPosition( new cc.p(Math.floor(Math.random() * screenWidth),1200));
             console.log(life);
        }
        return true;   

    }
    
});