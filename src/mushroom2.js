var mushroom2 = Items.extend({
    ctor: function(){
        this._super();
        this.initWithFile('res/images/mushroom2.png');
    },
    
     getScore: function(){
        return 10;
        
    }
    
});