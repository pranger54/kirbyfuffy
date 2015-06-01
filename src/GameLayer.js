var screenWidth = 800;
var screenHeight = 600;
var life =5;
var score =0;

var GameLayer = cc.LayerColor.extend({
	init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.createBackground();
        this.createPlayer();
        this.createMonster();
        this.createLabel();
        this.createItems();
		this.addKeyboardHandlers();
		this.state = GameLayer.STATES.FRONT;
        this.started = false;
        this.scheduleUpdate();
        return true;
        
       
	},

    createMonster: function() {
        this.magman = new Magman();
        this.magman.setPosition(new cc.p(300,300));
        this.magman.scheduleUpdate();
        this.addChild(this.magman);
        
        this.bun = new Bun();
        this.bun.setPosition(new cc.p(200,200));
        this.bun.scheduleUpdate();
        this.addChild(this.bun);
        
        this.lalala = new Lalala();
        this.lalala.setPosition(new cc.p(350,350));
        this.lalala.scheduleUpdate();
        this.addChild(this.lalala);
        
        this.efreeti = new Efreeti();
        this.efreeti.setPosition(new cc.p(200,100));
        this.efreeti.scheduleUpdate();
        this.addChild(this.efreeti);
    },
    
    createItems: function(){
        this.mushroomFirst = new mushroom1();
        this.mushroomFirst.setPosition(new cc.p(100,150));
        this.mushroomFirst.scheduleUpdate();
        this.addChild(this.mushroomFirst);
        
        this.mushroomSecond = new mushroom2();
        this.mushroomSecond.setPosition(new cc.p(230,170));
        this.mushroomSecond.scheduleUpdate();
        this.addChild(this.mushroomSecond);
        
        this.suc = new sucrose();
        this.suc.setPosition(new cc.p(320,260));
        this.suc.scheduleUpdate();
        this.addChild(this.suc);
    },
    
    checkCollide: function( object1 ,object2,scope){
        var Object1Pos = object1.getPosition();
        var Object2Pos = object2.getPosition();
        return ( Math.abs( Object1Pos.x - Object2Pos.x ) <= scope ) && ( Math.abs( Object1Pos.y - Object2Pos.y ) <= scope );
    },
    
    
    createBackground: function() {
        this.background = cc.Sprite.create( "res/images/kirbyfuffymainblackground.jpg" );
        this.background.setPosition( new cc.Point( screenWidth/2 , screenHeight/2) );
        this.addChild(this.background);
    },

    createPlayer: function() {
        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 8) );
        this.player.scheduleUpdate();
        this.addChild(this.player);
        
    },
    
    createLabel: function(){
        
        this.scoreLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',30 );
        this.scoreLabel.setPosition( new cc.Point( 120,500 ) );
        this.addChild( this.scoreLabel );
        this.scoreLabel.setString( score );
        this.scoreLabel.setColor( new cc.Color( 222, 179, 71 ) );
        
        this.textLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',20 );
        this.textLabel.setPosition( new cc.Point( 100,500 ) );
        this.addChild( this.textLabel );
        this.textLabel.setString( "Score:" );
        this.textLabel.setColor( new cc.Color( 153, 129, 49) );
        
        this.lifetext = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',20 );
        this.lifetext.setPosition( new cc.Point( 650,500 ) );
        this.addChild( this.lifetext );
        this.lifetext.setString( "Life:" );
        this.lifetext.setColor( new cc.Color( 60, 21, 189 ) );
        
        this.lifeLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',20 );
        this.lifeLabel.setPosition( new cc.Point( 670 ,500 ) );
        this.addChild( this.lifeLabel );
        this.lifeLabel.setString( life );
        this.lifeLabel.setColor( new cc.Color( 178, 0 ,25 ) );
        
        
        
        
    },
  

	addKeyboardHandlers: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                self.onKeyDown(keyCode, event);
            },
             onKeyReleased: function(keyCode, event) {
                
            }
        }, this);
    },
    
    onKeyDown: function( keyCode, event ) {
        

        if (this.state == GameLayer.STATES.FRONT){
            this.state = GameLayer.STATES.STARTED;
                this.player.start();
             this.state = GameLayer.STATES.STARTED;
           
           
        }
        else if (this.state == GameLayer.STATES.STARTED){
            if ( keyCode == cc.KEY.left ) {
                this.player.switchDirection(2);//2 = left
            
            }
            else if ( keyCode == cc.KEY.right ) {
                this.player.switchDirection(1);//1 = right
                
            }
            else if(keyCode == cc.KEY.space){
                this.player.jump();//3 = jump
                console.log(keyCode);
            
            }

        }
        if( keyCode == 13 && this.start == false ){
            this.start = true;
            
        }
        else if( keyCode == 8 ){
            cc.director.runScene(new MenuScene());
        }
        
    },
    
    
    update: function(dt){
        
        this.suc.hit(this.player);
        this.mushroomFirst.hit(this.player);
        this.mushroomSecond.hit(this.player);
        this.magman.hit(this.player);
        this.lalala.hit(this.player);
        this.efreeti.hit(this.player);
        this.bun.hit(this.player);
        this.lifeLabel.setString( life );
        this.scoreLabel.setString( score );
        this.playerDead();
        
        
    },
    
    
     updateHighScore: function(){
        if( this.score >= highscore ){
            highscore = this.score;
            this.highscoreLabel.setString( highscore );
        }
    },
    
    
    
    playerDead: function(){
        if( life == 0 ){
            this.unscheduleUpdate();
             cc.director.runScene(new GameoverScene() );
        }
        
    }
       
    
});


var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2
};

GameLayer.ARROWDIR = {
    LEFT : 37,
    RIGHT : 39
};