// Level 6
var player;
var space;
var game;
var timer;
function Player() {
    tPlayer = new Sprite(game, "img/cute.gif", 40, 40);
    tPlayer.show();
    tPlayer.setSpeed(0);
    tPlayer.direction = 90;
    tPlayer.falling = true;
    tPlayer.moving = true;
    tPlayer.dead = false;
    tPlayer.step = 5;

    tPlayer.checkKeys = function() {
        tPlayer.changeImage("img/cute.gif");
        if (keysDown[K_LEFT]) {
            this.direction = 270;
            this.changeXby(-this.step);
        }
        
        if (keysDown[K_RIGHT]) {
            this.direction = 90;
            this.changeXby(this.step);
        }

        if (this.moving == false) {
            if (keysDown[K_UP]) {
                this.direction = 0;
                this.changeYby(-4 * this.step);
            }
        }
    }
    
    tPlayer.checkGravity = function() {
        if (this.moving) {  
            if (this.falling) {
                this.changeYby(2);
                this.addVector(180, 0.4);
            }
        }
    }
    
    tPlayer.checkBound = function() {
        if (this.y > 360) {
            this.y = 360;
            this.moving = false;
        } 
        if (this.y < 15) {
            this.y = 15;
        }
        if (this.x < 15) {
            this.x = 15;
        }
        if (this.x > 590) {
            this.x = 590;
            game.stop();
            document.location.href = "congrats.html";
        }

    }
    
    return tPlayer;
}

function Obstacle() {
    tObstacle = new Sprite(game, "img/Kappa.png", 30, 30);
    tObstacle.show();
    tObstacle.setSpeed(-1);
    tObstacle.direction = 270;
    tObstacle.falling = true;
    tObstacle.moving = true;
    tObstacle.dead = false;
    tObstacle.step = 4;

    tObstacle.checkCollision = function() {
        // check if player has crashed into obstacle
        if (this.collidesWith(player)) {
            player.dead = true;
            game.stop();
            document.location.href = "";
        }
    }

    tObstacle.checkKeys = function() {
        if (this.moving == false) {
            if (keysDown[K_UP]) {
                this.direction = 0;
                this.changeYby(-4 * this.step);
            }
        }
    }
    
    tObstacle.checkGravity = function() {
        if (this.moving) {  
            if (this.falling) {
                this.changeYby(2);
                this.addVector(180, 0.4);
            }
        }
    }
    
    tObstacle.checkBound = function() {
        if (this.y > 90 * i) {
            this.y = 90 * i;
            this.moving = false;
        }
        if (this.y > 360) {
            this.y = 360;
            this.moving = false;
        }
        if (this.y < 15) {
            this.y = 15;
        }
        if (this.x < 15) {
            this.setSpeed = -1;
        }
        if (this.x > 590) {
            this.x = 590;
        }

    }
    
    return tObstacle; 
}

function randomFromInterval(from, to) {
    return (Math.random() * (to - from + 1) + from);
}

function makeObstacles() {
    oWidth = 40;
    oHeight = 40;
    obstacle = new Array(8);
    for (i = 0; i < 5; i++) {
        obstacle[i] = new Obstacle();
        obstacle[i].setPosition(500 - oWidth - 50 * i, oHeight * i);
    }
    for (j = 5; j < obstacle.length; j++) {
        obstacle[j] = new Obstacle();
        obstacle[j].setPosition(700 - oWidth - 50 * j, oHeight * j);
    }
}

function updateObstacles() {
   for (i = 0; i < obstacle.length; i++) {
        obstacle[i].checkCollision();
        obstacle[i].checkKeys();
        obstacle[i].checkGravity();
        obstacle[i].checkBound();
        obstacle[i].update();  
    }
}

function init() {
    game = new Scene();
    game.setSize(600, 400);
    timer = new Timer();
    space1 = new Sprite(game, "img/Background1.png", 600, 400);
    space1.setSpeed(0);
    space1.setPosition(300, 200);
    space2 = new Sprite(game, "img/Background1.png", 600, 400);
    space2.setSpeed(0);
    space2.setPosition(900, 200);
    player = new Player();
    player.setPosition(20, 100);
    makeObstacles();
    game.start();
}

function update() {
    game.clear();
    space1.update(); 
    space2.update();           
    player.checkKeys();
    player.checkGravity();
    player.checkBound();
    updateObstacles();
    player.update();
}
