var Power = cc.Sprite.extend({
    
    ctor: function(){
        this._super();
    },

    update: function(dt){
        var pos = this.getPosition();
        this.vy = -6;
        this.setPosition( pos.x, pos.y + this.vy );
    }                       
});