var MenuPage = cc.Layer.extend({
     ctor: function(){
        this._super();
        this.init();
    },
     
    init: function() {
        this._super();  
        this.createBackground();
        this.scheduleUpdate();
        this.addKeyboardHandlers();
         
        
        return true;
    },
    
    createBackground: function(){
        this.MainMenuBlackground = new MainMenuBlackground();
        this.MainMenuBlackground.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.MainMenuBlackground );
        
    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },
    
    onKeyDown: function( keyCode, event ) {
        
    },
    
    onKeyUp: function( keyCode, event ) {
        if (keyCode == cc.KEY.enter) {
            cc.director.runScene(new StartScene());
        }
    },
    
    update: function(dt) {

    }
     

});


var MenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MenuPage();
        layer.init();
        this.addChild( layer );
    }
});
