/**
 * Created by bensmith on 5/4/15.
 */

var You = {
    hearts: 3,
    attack: 1,
    xPos: 0,
    yPos:0,
    speed: 128 //Movement in pixels per second
};

function baddie(hits, damage) {
    this.hits = hits;
    this.damage = damage;
    this.xPos = 0;
    this.yPos = 0;
}

//canvas variables
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;
//canvas.style.backgroundColor = "green";
document.body.appendChild(canvas);


//Image Initializers
var bgReady = false;
var bgImg = new Image();
bgImg.onload = function(){
    bgReady = true
};
bgImg.src = "BACKGRND.bmp";

var warrReady = false;
var warriorImg = new Image();
warriorImg.onload = function(){
    warrReady = true
};
warriorImg.src = "sprite_1.png";

var warr2Ready = false;
var warrior2Img = new Image();
warrior2Img.onload = function(){
    warr2Ready = true
};
warrior2Img.src = "sprite_2.png";


//Keyboard input
var keysdown = {};

addEventListener("keydown", function(e){
    keysdown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
    delete keysdown[e.keyCode];
}, false);

var newGame = function(){
    You.xPos = canvas.width / 2;
    You.yPos = canvas.height / 2;
};

var update = function(modifier){
    if(38 in keysdown){  //up
        You.yPos -= You.speed * modifier;
    }
    if(40 in keysdown){  //down
        You.yPos += You.speed * modifier;
    }
    if(37 in keysdown){  //left
        You.xPos -= You.speed * modifier;
    }
    if(39 in keysdown){  //right
        You.xPos += You.speed * modifier;
    }
};

//draw crap

var render = function(){
    if(bgReady){
        ctx.drawImage(bgImg,0,0);
    }
    var d = new Date();
    if(d.getSeconds() % 2 == 0){
        if(warrReady){
            ctx.drawImage(warriorImg, You.xPos, You.yPos);
        }
    } else {
        if(warr2Ready){
            ctx.drawImage(warrior2Img, You.xPos, You.yPos);
        }
    }

};

//Main Game Loop
var main = function(){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

var then = Date.now();
newGame();
main();