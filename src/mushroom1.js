var mushroom1 = Items.extend({
    ctor: function(){
        this._super();
        this.initWithFile('res/images/mushroom1.png');
    },
    
    getScore: function(){
        return 5;
        
    }
    
});