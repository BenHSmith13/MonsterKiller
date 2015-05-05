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
var warrior = {
    hearts: 3,
    attack: 1,
    xPos: 0,
    yPos:0,
    speed: 128 //Movement in pixels per second
};

function Baddie(hits, damage) {
    this.hits = hits;
    this.damage = damage;
    this.xPos = canvas.width - 64;
    this.yPos = Math.random() * canvas.height;
    this.yDest = Math.random() * canvas.height;
    this.speed = 100;
}

var bad1 = new Baddie(1,1);

var baddies = [bad1];

function addBaddie(){
    baddies[baddies.length] = new Baddie(1, 1);
}

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
monsterImg.src = "Imgs/Office.png";

//Keyboard input -------------------------------------------------------------------------------------------------------
var keysdown = {};

addEventListener("keydown", function(e){
    keysdown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
    delete keysdown[e.keyCode];
}, false);

var update = function(modifier){
    //warrior
    if(38 in keysdown && warrior.yPos > 0){  //up
        warrior.yPos -= warrior.speed * modifier;
    }
    if(40 in keysdown && warrior.yPos < canvas.height - 64){  //down
        warrior.yPos += warrior.speed * modifier;
    }
    if(37 in keysdown && warrior.xPos > 0){  //left
        warrior.xPos -= warrior.speed * modifier;
    }
    if(39 in keysdown && warrior.xPos < canvas.width - 64){  //right
        warrior.xPos += warrior.speed * modifier;
    }

    //baddies
    var s = new Date().getSeconds();

    if(s % 5 == 0) addBaddie();

    if(baddies.length > 0){
        for(var i = 0; i < baddies.length; i++){
            baddies[i].xPos -= baddies[i].speed * modifier;
            if(baddies[i].yPos < baddies[i].yDest) baddies[i].yPos += baddies[i].speed * modifier;
            else if (baddies[i].yPos > baddies[i].yDest) baddies[i].yPos -= baddies[i].speed * modifier;
        }
    }

};

//draw crap ------------------------------------------------------------------------------------------------------------
var render = function(){
    if(bgReady){ ctx.drawImage(bgImg,0,0); }  //Draws Background

    var d = new Date();

    //warrior movement
    if(38 in keysdown || 40 in keysdown || 37 in keysdown || 39 in keysdown){ //Walk Graphic
        if(d.getMilliseconds() < 125 || d.getMilliseconds() >= 500 && d.getMilliseconds() < 625) {
            if(wWalk1Ready){ ctx.drawImage(wWalk1Img, warrior.xPos, warrior.yPos); }
        } else if(d.getMilliseconds() < 250 || d.getMilliseconds() >= 625 && d.getMilliseconds() < 750){
            if(wWalk2Ready){ ctx.drawImage(wWalk2Img, warrior.xPos, warrior.yPos);}
        } else if(d.getMilliseconds() < 375 || d.getMilliseconds() >= 750 && d.getMilliseconds() < 875){
            if(wWalk3Ready){ctx.drawImage(wWalk3Img, warrior.xPos, warrior.yPos);}
        } else {
            if(wWalk4Ready){ ctx.drawImage(wWalk4Img, warrior.xPos, warrior.yPos);}
        }
    }
    else if(32 in keysdown){  //Spacebar attack
        if(attackReady){ ctx.drawImage(attackImg, warrior.xPos, warrior.yPos);}
    }
    else { //Warrior Shifts in Place
        if (d.getSeconds() % 2 == 0) {
            if (warrReady) {
                ctx.drawImage(warriorImg, warrior.xPos, warrior.yPos);
            }
        }
        else {
            if (warr2Ready) {
                ctx.drawImage(warrior2Img, warrior.xPos, warrior.yPos);
            }
        }
    }

    //Baddie Movement
    if(baddies.length > 0 && monsterReady){
        for(var i = 0; i < baddies.length; i++){
            ctx.drawImage(monsterImg, baddies[i].xPos, baddies[i].yPos);
        }
    }

};

//Main Game Loop -------------------------------------------------------------------------------------------------------
var main = function(){
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    //if(now.getSeconds() % 5 == 0) addBaddie();

    then = now;

    requestAnimationFrame(main);
};

var newGame = function(){
    warrior.xPos = canvas.width / 2;
    warrior.yPos = canvas.height / 2;
};

var then = Date.now();
newGame();
main();