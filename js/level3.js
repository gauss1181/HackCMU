// Level 3
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
                this.addVector(180, 0.7);
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
            document.location.href = "level4.html";
        }

    }
    
    return tPlayer;
}

function Obstacle() {
    tObstacle = new Sprite(game, "img/block.png", 50, 25);
    tObstacle.setSpeed(0);

    tObstacle.checkCollision = function() {
        // check if player has crashed into obstacle
        if (this.collidesWith(player)) {
            oTop = this.y - (this.height / 2);
            pBottom = player.y + (player.height / 2);
            oBottom = this.y + (this.height / 2);
            pTop = player.y + (player.height / 2) - 10;
            if (pBottom >= oTop || pTop <= oBottom) {
                player.dead = true;
                game.stop();
                document.location.href = "";
            }
        }
    }
    return tObstacle; 
}

function makeObstacles() {
    oWidth = 50;
    oHeight = 25;
    obstacles = new Array(37);
    for (i = 0; i < 3; i++) {
        obstacles[i] = new Obstacle();
        obstacles[i].setPosition(100, oHeight * i);
    }
    for (j = 3; j < 12; j++) {
        obstacles[j] = new Obstacle();
        obstacles[j].setPosition(100, 400 - oHeight * (j - 2));
    }
    for (k = 12; k < 22; k++) {
        obstacles[k] = new Obstacle();
        obstacles[k].setPosition(300, oHeight * (k - 12));
    }
    for (l = 22; l < 25; l++) {
        obstacles[l] = new Obstacle();
        obstacles[l].setPosition(300, 400 - oHeight * (l - 22));
    }
    for (m = 25; m < 28; m++) {
        obstacles[m] = new Obstacle();
        obstacles[m].setPosition(500, oHeight * (m - 25));
    }
    for (n = 28; n < 37; n++) {
        obstacles[n] = new Obstacle();
        obstacles[n].setPosition(500, 400 - oHeight * (n - 27));
    }
}

function updateObstacles() {
    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].checkCollision();
        obstacles[i].update();
    }
}

function init() {
    game = new Scene();
    game.setSize(600, 400);
    timer = new Timer();
    space1 = new Sprite(game, "img/Background1.png", 600, 400);
    space1.setSpeed(0);
    space1.setPosition(300, 200);
    player = new Player();
    player.setPosition(20, 100);
    makeObstacles();
    game.start();
}

function update() {
    game.clear();
    space1.update();            
    player.checkKeys();
    player.checkGravity();
    player.checkBound();
    updateObstacles();
    player.update();
}
