 var life = 5;

var Player = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/kirby.png' );
        this.direction = 3; 
        console.log("ddd"+this.direction);
        this.vy = 0; 
        this.started = false;
        this.Heart = 5;
        this.speed =0;
        Player.JUMPING_VELOCITY = 15;
		this.gravityAcceleration = -1;
    },

    
    update: function( dt ) {
		var pos = this.getPosition();
		if(this.direction==Player.DIR.RIGHT){
			if(pos.x < 800) 
				this.setPosition(new cc.Point(pos.x + 5 +this.speed , pos.y));
			else 
				this.setPosition( new cc.Point( 0, pos.y) );
		}

		if(this.direction==Player.DIR.LEFT){
			if(pos.x > 0)
				this.setPosition(new cc.Point(pos.x - 5+this.speed, pos.y));
			else
				this.setPosition( new cc.Point( 800, pos.y) );
		}
        
          if(this.getPositionY()>100){
            this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
            this.setPositionX( this.getPositionX() + 5 );
            this.vy += this.gravityAcceleration;
			if(this.getPositionY()<-40)
        	  this.setPositionY(-40);
            if(this.getPositionY()>screenHeight+40)
           this.setPositionY(screenHeight+40);
        }
		

    },


     switchDirection: function(direct) {

		if ( direct == 1) {
	    	this.direction = Player.DIR.RIGHT;
	    	this.setRotation( 0 );
	    }
		if ( direct == 2 ) {
	    	this.direction = Player.DIR.LEFT;
	    	this.setRotation( 0 );
	    }
         
        if(direct == 3) {
            this.direction = Player.DIR.JUMP;
            this.vy = 15;
            this.setRotation( 0 );
        }

    },


    jump: function(jumping) {
        var pos = this.getPosition();
        this.vy = Player.JUMPING_VELOCITY; 
        this.setPosition( new cc.Point( pos.x, pos.y + 50) );
    },

    start: function(dt){
    	if(this.started){
    		this.started  = true;
            this.setPosition(this.setPositionY(0));
    	}
    }


});
Player.DIR = {
    RIGHT: 1,
    LEFT: 2,
    JUMP: 3
};

Player.G = -1;
Player.STARTING_VELOCITY = 15;
Player.JUMPING_VELOCITY = 40;
