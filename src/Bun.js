var Bun = Monster.extend({   
    
    ctor: function(){
        this._super();
        this.initWithFile( 'res/images/Bun.png' );
    },
    
      update: function(dt){
        var pos = this.getPosition();
        this.vy = -10;
       this.setPosition(pos.x,pos.y-this.vy);
    }
 });
    
        
        