var Stopwatch = cc.Sprite.extend({
    ctor: function(){
        this._super();
        this.timer = 180;
    },
    
    runtime: function(){
        if(this.timer>0){
        this.Schedule(this.timer,1);
        }
        
        if(this.timer==0){
             this.unscheduleUpdate();
        }
        
    },
    
    addtime: function(){
        if(this.timer>0){        this.Schedule(this.timer+10,1);
        }
    }
});