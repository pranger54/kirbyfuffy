var Gameover = cc. LayerColor.extend({

    init: function() {
         this._super();
         this.show = new GameLayer();
         this.createBlackground();   
this.scheduleUpdate();
    },
    
    update: function(){
      
    },

    createBlackground: function(){
        this.GameOverBackground = new GameoverBlackground();
        this.GameOverBackground.setPosition( new cc.Point( screenWidth/2 , screenHeight/2 ) );
        this.addChild( this.GameOverBackground );
    }
    
//     createLabel: function(){
//          this.scoreLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',60 );
// this.scoreLabel.setPosition( new cc.Point( 120,550 ) );
//         this.addChild( this.scoreLabel );
//  this.scoreLabel.setString( " HighScore"); this.scoreLabel.setColor( new cc.Color( 222, 179, 71 ) );
 
//    this.scoreLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',60 );
//  this.scoreLabel.setPosition( new cc.Point( 120,500 ) );
//         this.addChild( this.scoreLabel );
//  this.scoreLabel.setString( this.show.updateHighScore); this.scoreLabel.setColor( new cc.Color( 222, 179, 71 ) );
        
//      this.scoreLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',60 );
// this.scoreLabel.setPosition( new cc.Point( 120,550 ) );
//         this.addChild( this.scoreLabel );
//  this.scoreLabel.setString( " HighScore"); this.scoreLabel.setColor( new cc.Color( 222, 179, 71 ) );
 
//    this.scoreLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',60 );
//  this.scoreLabel.setPosition( new cc.Point( 120,500 ) );
//         this.addChild( this.scoreLabel );
//  this.scoreLabel.setString( this.show.updateHighScore); this.scoreLabel.setColor( new cc.Color( 222, 179, 71 ) );
//  }
 });
    
    var GameoverScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new Gameover();
        layer.init();
        this.addChild( layer );
    }
});
    