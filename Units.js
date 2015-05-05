/**
 * Created by bensmith on 5/4/15.
 */
//canvas variables -----------------------------------------------------------------------------------------------------
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 500;
//canvas.style.backgroundColor = "green";
document.body.appendChild(canvas);


//Unit Objects ---------------------------------------------------------------------------------------------------------
var score = 0;

var Hero = {
    hearts: 3,
    attack: 1,
    xPos: 0,
    yPos:0,
    speed: 128, //Movement in pixels per second
    canHit: true
};

function Baddie(hits, damage) {
    this.hits = hits;
    this.damage = damage;
    this.xPos = canvas.width - 64;
    this.yPos = Math.random() * canvas.height;
    this.yDest = Math.random() * canvas.height - 64;
    this.speed = 100;
    this.visible = true;
}

var bad1 = new Baddie(1,1);
var baddies = [bad1];
setInterval(function(){ //Add new baddie every 5 seconds
    baddies[baddies.length] = new Baddie(1, 1);
}, 5000);


//Image Initializing ---------------------------------------------------------------------------------------------------
var bgReady = false,
    warrReady = false,
    warr2Ready = false,
    wWalk1Ready = false,
    wWalk2Ready = false,
    wWalk3Ready = false,
    wWalk4Ready = false,
    attackReady = false;
var monsterReady = false;

var bgImg = new Image(),
    warriorImg = new Image(),
    warrior2Img = new Image(),
    wWalk1Img = new Image(),
    wWalk2Img = new Image(),
    wWalk3Img = new Image(),
    wWalk4Img = new Image(),
    attackImg = new Image();
var monsterImg = new Image();

bgImg.onload = function(){ bgReady = true };
warriorImg.onload = function(){ warrReady = true };
warrior2Img.onload = function(){ warr2Ready = true };
wWalk1Img.onload = function(){ wWalk1Ready = true };
wWalk2Img.onload = function(){ wWalk2Ready = true };
wWalk3Img.onload = function(){ wWalk3Ready = true };
wWalk4Img.onload = function(){ wWalk4Ready = true };
attackImg.onload = function(){ attackReady = true };
monsterImg.onload = function(){ monsterReady = true };

bgImg.src = "Imgs/BACKGRND.bmp";
warriorImg.src = "Imgs/sprite_1.png";
warrior2Img.src = "Imgs/sprite_2.png";
wWalk1Img.src = "Imgs/warriorWalk_1.png";
wWalk2Img.src = "Imgs/warriorWalk_2.png";
wWalk3Img.src = "Imgs/warriorWalk_3.png";
wWalk4Img.src = "Imgs/warriorWalk_4.png";
attackImg.src = "Imgs/warriorAttack.png";
monsterImg.src = "Imgs/goatMan.png";

//Keyboard input -------------------------------------------------------------------------------------------------------
var keysdown = {};

addEventListener("keydown", function(e){
    keysdown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
    delete keysdown[e.keyCode];
}, false);

var update = function(modifier){
    //Hero
    if(38 in keysdown && Hero.yPos > 0){  //up
        Hero.yPos -= Hero.speed * modifier;
    }
    if(40 in keysdown && Hero.yPos < canvas.height - 64){  //down
        Hero.yPos += Hero.speed * modifier;
    }
    if(37 in keysdown && Hero.xPos > 0){  //left
        Hero.xPos -= Hero.speed * modifier;
    }
    if(39 in keysdown && Hero.xPos < canvas.width - 64){  //right
        Hero.xPos += Hero.speed * modifier;
    }

    //baddies
    if(baddies.length > 0){
        for(var i = 0; i < baddies.length; i++){
            baddies[i].xPos -= baddies[i].speed * modifier;
            if(baddies[i].yPos < baddies[i].yDest) baddies[i].yPos += baddies[i].speed * modifier;
            else if (baddies[i].yPos > baddies[i].yDest) baddies[i].yPos -= baddies[i].speed * modifier;
        }
    }

    collisions();
};

//Collision Handler ----------------------------------------------------------------------------------------------------
function collisions(){
    for(var i = 0; i < baddies.length; i++){
        //Hero Collision
        if(baddies[i].xPos >= Hero.xPos && baddies[i].xPos <= Hero.xPos + 64 //Check top left edge
            && baddies[i].yPos >= Hero.yPos && baddies[i].yPos <= Hero.yPos + 64
            || baddies[i].xPos + 64 >= Hero.xPos && baddies[i].xPos + 64 <= Hero.xPos + 64 //Check top right edge
            && baddies[i].yPos >= Hero.yPos && baddies[i].yPos <= Hero.yPos + 64
            || baddies[i].xPos >= Hero.xPos && baddies[i].xPos <= Hero.xPos + 64 //Check bottom Left edge
            && baddies[i].yPos + 64 >= Hero.yPos && baddies[i].yPos + 64 <= Hero.yPos + 64
            || baddies[i].xPos + 64 >= Hero.xPos && baddies[i].xPos + 64 <= Hero.xPos + 64 //Check bottom Right edge
            && baddies[i].yPos + 64 >= Hero.yPos && baddies[i].yPos + 64 <= Hero.yPos + 64 ){
            baddies[i].visible = false;
            if(32 in keysdown && !(37 in keysdown) && !(38 in keysdown) && !(39 in keysdown) && !(40 in keysdown)){
                //If stabbing
                score += 10;
            } else {
                //Need to set temp invincibility
                Hero.hearts -= 1;
            }
        }

    }
}


//draw crap ------------------------------------------------------------------------------------------------------------
var render = function(){
    if(bgReady){ ctx.drawImage(bgImg,0,0); }  //Draws Background

    var d = new Date();

    //Hero movement
    if(38 in keysdown || 40 in keysdown || 37 in keysdown || 39 in keysdown){ //Walk Graphic
        if(d.getMilliseconds() < 125 || d.getMilliseconds() >= 500 && d.getMilliseconds() < 625) {
            if(wWalk1Ready){ ctx.drawImage(wWalk1Img, Hero.xPos, Hero.yPos); }
        } else if(d.getMilliseconds() < 250 || d.getMilliseconds() >= 625 && d.getMilliseconds() < 750){
            if(wWalk2Ready){ ctx.drawImage(wWalk2Img, Hero.xPos, Hero.yPos);}
        } else if(d.getMilliseconds() < 375 || d.getMilliseconds() >= 750 && d.getMilliseconds() < 875){
            if(wWalk3Ready){ctx.drawImage(wWalk3Img, Hero.xPos, Hero.yPos);}
        } else {
            if(wWalk4Ready){ ctx.drawImage(wWalk4Img, Hero.xPos, Hero.yPos);}
        }
    }
    else if(32 in keysdown){  //Spacebar attack
        if(attackReady){ ctx.drawImage(attackImg, Hero.xPos, Hero.yPos);}
    }
    else { //Warrior Shifts in Place
        if (d.getSeconds() % 2 == 0) {
            if (warrReady) {
                ctx.drawImage(warriorImg, Hero.xPos, Hero.yPos);
            }
        }
        else {
            if (warr2Ready) {
                ctx.drawImage(warrior2Img, Hero.xPos, Hero.yPos);
            }
        }
    }

    //Baddie Movement
    if(baddies.length > 0 && monsterReady){
        for(var i = 0; i < baddies.length; i++){
            if(baddies[i].visible){
                ctx.drawImage(monsterImg, baddies[i].xPos, baddies[i].yPos);
            }
        }
    }

};

//Main Game Loop -------------------------------------------------------------------------------------------------------
var main = function(){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

var newGame = function(){
    Hero.xPos = canvas.width / 2;
    Hero.yPos = canvas.height / 2;
};

var then = Date.now();
newGame();
main();