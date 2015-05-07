var Fishbone = Monster.extend({
ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Fishbone.png' );
    },
    
    update: function(dt){
        var pos = this.getPosition();
        this.vx = -5;
       this.setPosition(pos.x+this.vx,pos.y);
    }
    
});