var Efreeti = Monster.Extend({

    ctor: function(){
        this._super();
        this.initWithFile('res/images/Efreeti.png');
    },
    
    update: function(dt){
        var pos = this.getPostion();
        this.vy = -11;
        this.setPosition(pos.x,pos.y+this.vy);
    }
        
    
    });