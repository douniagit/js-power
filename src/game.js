 // creer l'etat qui va contenir le jeu
var game = new Phaser.Game(500, 700);  

var mainState = {
    preload: function() {
       game.load.image('paddle', 'assets/stroke.png'); 
       game.load.image('brick', 'assets/banana.png');
       game.load.image('ball', 'assets/ball.png'); 
    },

    create: function() {
		game.stage.backgroundColor = '#333';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;

           // Create the left/right arrow keys
	    this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	    // Add the paddle at the bottom of the screen
	    this.paddle = game.add.sprite(190, 600, 'paddle');
	    // Make sure the paddle won't move when it hits the ball
	    this.paddle.body.immovable = true;

	    this.bricks = game.add.group();  
	    for (var i = 0; i < 6; i++) {
	        for (var j = 0; j < 6; j++) {
	            var brick = game.add.sprite(55+i*60, 55+j*60, 'brick');
	            brick.body.immovable = true;
	            this.bricks.add(brick);
	        }
	    }
     // Add the ball 
	    this.ball = game.add.sprite(200, 400, 'ball');
	    // Give the ball some initial speed
	    this.ball.body.velocity.x = 200;
	    this.ball.body.velocity.y = 200;
	    // Make sure the ball will bounce when hitting something
	    this.ball.body.bounce.setTo(1); 
	    this.ball.body.collideWorldBounds = true;
    },

    update: function() {  
        // Here we update the game 60 times per second
	         // Move the paddle left/right when an arrow key is pressed
	    if (this.left.isDown) this.paddle.body.velocity.x = -600;
	    else if (this.right.isDown) this.paddle.body.velocity.x = 600;
	    // Stop the paddle when no key is pressed
	    else this.paddle.body.velocity.x = 0;  
	     // Add collisions between the paddle and the ball
	    game.physics.arcade.collide(this.paddle, this.ball);
	    // Call the 'hit' function when the ball hits a brick
	    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
	    // Restart the game if the ball is below the paddle
	    if (this.ball.y > this.paddle.y)
	        game.state.start('main');  
		},

	// New function that removes a brick from the game
		hit: function(ball, brick) {  
		    brick.kill();
		},
	};

// Initialize the game and start our state
game.state.add('main', mainState);  
game.state.start('main');


