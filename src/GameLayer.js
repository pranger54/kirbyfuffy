var screenWidth = 800;
var screenHeight = 600;

var GameLayer = cc.LayerColor.extend({
	init: function() {
        this.createBackground();
        this.createPlayer();
        this.createLabel();
        this.createTime();
		this.addKeyboardHandlers();
		this.state = GameLayer.STATES.FRONT;
		this.player.scheduleUpdate();
        this.started = false;
        return true;
        
       
	},

    createBackground: function() {
        this.background = cc.Sprite.create( "res/images/kirbyfuffymainblackground.jpg" );
        this.background.setPosition( new cc.Point( screenWidth/2 , screenHeight/2) );
        this.addChild(this.background);
        console.log("create")
    },

    createPlayer: function() {
        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 8) );
        this.addChild(this.player);
    },
    
    createTime: function(){
        this.time = new Stopwatch();
        this.timeLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',20 );
         this.time.setPosition(new cc.Point( screenWidth/2 ,10 ) );
        this.addChild( this.timeLabel );
        this.timeLabel.setString( this.time );
        this.timeLabel.setColor( new cc.Color( 178, 0 ,25 ) );
    },
    
    createLabel: function(){
        this.score = 0;
        this.life = 5;
        
        this.scoreLabel = cc.LabelTTF.create( '0','res/fonts/Kirby___.ttf',30 );
        this.scoreLabel.setPosition( new cc.Point( 120,500 ) );
        this.addChild( this.scoreLabel );
        this.scoreLabel.setString( this.score );
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
        
    },
  

	addKeyboardHandlers: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                self.onKeyDown(keyCode, event);
            },
             onKeyReleased: function(keyCode, event) {
                self.onKeyUp(keyCode, event);
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
        
    },
    
    update: function(dt){
        if( this.start == true ){
            this.randomItems();
            this.randomPowers();
            this.getScoreAll();
            this.checkCollide();
            this.playerDead();
            
        }
    },
    
     updateHighScore: function(){
        if( this.score >= highscore ){
            highscore = this.score;
            this.highscoreLabel.setString( highscore );
        }
    },
    
    
    checkCollide: function( object1 ,object2, scope ){
        var Object1Pos = object1.getPosition();
        var Object2Pos = object2.getPosition();
        return ( Math.abs( Object1Pos.x - Object2Pos.x ) <= scope ) && ( Math.abs( Object1Pos.y - Object2Pos.y ) <= scope );
    },
    
    
    playerDead: function(){
        if( this.life == 0 ){
            this.started = false;
            this.unscheduleUpdate();
        }
        
        if(this.time.Timeout()==0){
 this.started = false;
            this.unscheduleUpdate();
        
        }
    },
    
    randomItems: function() {
        var randNum = Math.floor(Math.random() * 50);
        var randPosX = Math.floor(Math.random() * screenWidth);
        
        if(randNum == 1){
            this.randomItems();
            this.addChild(this.item);
            this.item.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.item.scheduleUpdate();
        }
    }
    
    randomPowers: function() {
    
        var randNum = Math.floor( Math.random() * 1500 );
        var randPosX = Math.floor( Math.random() * screenWidth );

        if( randNum == 2 ){            
            this.power = new sucrose();
            this.addChild( this.power );
            this.power.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.power.scheduleUpdate();
        }
        
        else if( randNum == 3 ){
            this.power = new Fishbone();
            this.addChild( this.power );
            this.power.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.item.scheduleUpdate();
        }
        
        else if( randNum == 4 ){
            this.power = new Boost();
            this.addChild( this.power );
            this.power.setPosition( new cc.Point( randPosX,screenHeight ) );
            this.power.scheduleUpdate();
        }
     },
            
        randomItems: function(){
           var randNum = Math.floor( Math.random() * 32 );
        if( randNum==0||randNum<=50)
            this.item = new Mushroom1();
        else 
            this.item = new Mushroom2();
        },
            
        getScoreAll: function(){
            this.items = [];
            this.items = this.getChildren();
           
        for( var i=0 ; i < this.foods.length ; i++ ){
            if( this.items[i] instanceof Items ){
	            var itemsPos = this.items[i].getPosition();
                
                if( this.checkCollide( this.player, this.items[i], 35 ) ){
                    if( this.score + items[i].getScore() < 0){
                        this.score = 0;
                    }
                    else{ this.score += this.items[i].getScore(); }
                    this.scoreLabel.setString( this.score );
                    this.removeChild( this.items[i] );
                }
                
                else if( foodPos.y < 70 ){
                    this.removeChild( this.items[i] );
                }
            }
            
            else if( this.items[i] instanceof Power ){
                var powerPos = this.foods[i].getPosition();
                
                if( this.checkCollide( this.player, this.items[i], 35 ) ){
                    if( this.foods[i] instanceof sucrose ){
                        
                    this.heart = [];
                     this.heart[0] = new Heart();
                     this.heart.setPosition( new cc.Point( 654,500 ) );
                     this.heart[1] = new Heart();
                     this.heart.setPosition( new cc.Point( 658,500 ) );
                     this.heart[2] = new Heart();
                     this.heart.setPosition( new cc.Point( 662,500 ) );
                     this.heart[3] = new Heart();
                     this.heart.setPosition( new cc.Point( 666,500 ) );
                     this.heart[4] = new Heart();
                     this.heart.setPosition( new cc.Point( 670,500 ) );
                        for(int i =0;i<heart.length;i++){
                           this.life += 1;
                           this.heart[i].push();
                        }
                    }
                    else { this.foods[i].effect( this.player1 ); }
                    this.removeChild( this.foods[i] );
                }
                
                else if( itemPos.y < 70 ){
                    this.removeChild( this.foods[i] );
                }
            }
            
            else if( this.items[i] instanceof Monster ){
                var monsterPos = this.items[i].getPosition();
                
                if( this.checkCollide( this.player, this.items[i], 35 ) ){
                     this.heart = [];
                     this.heart[0] = new Heart();
                     this.heart.setPosition( new cc.Point( 654,500 ) );
                     this.heart[1] = new Heart();
                     this.heart.setPosition( new cc.Point( 658,500 ) );
                     this.heart[2] = new Heart();
                     this.heart.setPosition( new cc.Point( 662,500 ) );
                     this.heart[3] = new Heart();
                     this.heart.setPosition( new cc.Point( 666,500 ) );
                     this.heart[4] = new Heart();
                     this.heart.setPosition( new cc.Point( 670,500 ) );
         
                    if( this.life - 1 < 0){
                        this.life = 0;
                    }
                    else { 
                                       
                        for(int i =0;i<heart.length;i++){
                           this.life -= 1;
                           this.heart[i].pop();
                         }
                    }
                    this.removeChild( this.items[i] );
                }
                
                else if( monsterPos.x < 0 || monsterPosPos.x > 800 || monsterPos.y < 0){
                    this.removeChild( this.items[i] );
                }
            }
        }
        },
            
        addMonster: function(){
        var rateRandom = 1300 - ( this.time*5 ) ;
        
        if( rateRandom < 200 ){
            rateRandom = 200;
        }
        console.log( rateRandom );
        var randNum = Math.floor( Math.random() * rateRandom );
        if( randNum == 1 || randNum<10 ){
            this.mons = new Efreeti();
            this.addChild( this.mons );
            this.mons.setPosition( new cc.Point( 0,80 ) );
            this.mons.scheduleUpdate();
        }
        else if( randNum == 10||randNum<20 ){
            this.mons = new Fishbone();
            this.addChild( this.mons );
            this.mons.setPosition( new cc.Point( 800,80 ) );
            this.mons.scheduleUpdate();
        }
        else if( randNum == 20 || randNum<30){
            this.mons = new Bun();
            this.addChild( this.mons );
            this.mons.setPosition( new cc.Point( Math.floor( Math.random() * screenWidth ) , screenHeight ) );
            this.mons.scheduleUpdate();
        }
            
        else if( randNum == 20 || randNum<30){
            this.mons = new Magman();
            this.addChild( this.mons );
            this.mons.setPosition( new cc.Point( 500,400 ) );
            this.mons.scheduleUpdate();
        }
            
         else {
            this.mons = new Lalala();
            this.addChild( this.mons );
            this.mons.setPosition( new cc.Point( Math.floor( Math.random() * screenWidth ) , screenHeight ) );
            this.mons.scheduleUpdate();
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