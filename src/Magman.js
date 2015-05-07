var Magman = Monster.extend({   

    ctor: function(){
        this._super();
        this.initWithFile( 'res/images/Magman.png' );
    },
    
      update: function(dt){
        var pos = this.getPosition();
        this.vx = -4;
       this.setPosition(pos.x+this.vx,pos.y);
    }
    
 });
    
        
        


