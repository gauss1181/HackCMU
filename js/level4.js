// Level 4
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
    tPlayer.step = 7;

    tPlayer.checkKeys = function() {
        
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
            document.location.href = "level5.html";
        }

    }
    return tPlayer;
}

function Obstacle() {
    pics = ["img/pig1.png", "img/pig2.png", "img/pig3.png"];
    index = Math.floor(randomFromInterval(0, 3));
    tObstacle = new Sprite(game, pics[0], 40, 40);
    tObstacle.checkCollision = function() {
        // check if player has crashed into obstacle
        if (this.collidesWith(player)) {
            player.dead = true;
            game.stop();
            document.location.href = "";
        }
    }
    return tObstacle; 
}

function randomFromInterval(from,to) {
    return (Math.random() * (to - from + 1) + from);
}

function makeObstacles() {
    obstacles = new Array(6);
    for (i = 0; i < 6; i++) {
        obstacles[i] = new Obstacle();
        centerX = randomFromInterval((i + 1) * 70, (i + 2) * 70);
        centerY = randomFromInterval(270, 380);
        obstacles[i].setPosition(centerX, centerY);
        obstacles[i].setSpeed(randomFromInterval(-3, 3));
    }
}

function updateObstacles() {
    pics = ["img/pig1.png", "img/pig2.png", "img/pig3.png"];
    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].checkCollision();
        obstacles[i].update();
        obstacles[i].changeImage("img/pig2.png");
        obstacles[i].changeImage("img/pig1.png");
    }
}

function helpWall() {
    tHelpWall = new Sprite(game, "img/wall.png", 60, 15);
    tHelpWall.checkCollision = function() {
        // check if player has crashed into obstacle
        if (this.collidesWith(player)) {
            player.dead = true;
            game.stop();
            document.location.href = "";
        }
    }
    return tHelpWall;
}

function makeHelpWall() {
    length = 8;
    walls = new Array(length);
    for (i = 0; i < length; i++) {
        walls[i] = new helpWall();
        centerX = randomFromInterval(i * 70, (i + 2) * 70);
        centerY = randomFromInterval(0, 170);
        walls[i].setPosition(centerX, centerY);
        walls[i].setSpeed(randomFromInterval(-2, 2));
    }
}

function updateHelpWall() {
    for (i = 0; i < walls.length; i++) {
        walls[i].checkCollision();
        walls[i].update();
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
    player.setPosition(20, 300);
    makeObstacles();
    makeHelpWall();
    game.start();
}

function update() {
    game.clear();
    space1.update();            
    player.checkKeys();
    player.checkGravity();
    player.checkBound();
    player.changeImage("img/cute2.png");
    player.changeImage("img/cute1.png");
    updateObstacles();
    updateHelpWall();
    player.update();
}
