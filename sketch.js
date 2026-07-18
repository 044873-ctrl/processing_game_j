function setup(){createCanvas(600,400);resetGame();}
var player;
var platforms;
var coins;
var gravity;
var jumpForce;
var maxFallSpeed;
var score;
var gameOver;
var lastFrameOnPlatform;
function resetGame(){
gravity=0.7;
jumpForce=-12;
maxFallSpeed=15;
score=0;
gameOver=false;
player={x:300-15,y:0,w:30,h:30,vx:0,vy:0,canJump:true,prevY:0,onPlatform:false};
platforms=[];
var ground={x:0,y:370,w:600,h:30,isGround:true};
platforms.push(ground);
var lowestY=300;
var pwidth=120;
var px=200;
var p={x:px,y:lowestY,w:pwidth,h:10,isGround:false};
platforms.push(p);
for(var i=0;i<4;i++){
var w=randomInt(80,140);
var y=randomInt(120,290);
var x=randomInt(0,600-w);
platforms.push({x:x,y:y,w:w,h:10,isGround:false});
}
player.y=platforms[0].y-player.h-1;
player.vy=0;
coins=[];
for(var i=0;i<8;i++){
if(i<5){
var pi=randomInt(1,platforms.length-1);
var plat=platforms[pi];
var cx=random(plat.x+10,plat.x+plat.w-10);
var cy=plat.y-12;
coins.push({x:cx,y:cy,r:8});
}else{
var cx=random(20,580);
var cy=random(60,260);
coins.push({x:cx,y:cy,r:8});
}
}
lastFrameOnPlatform=false;
}
function draw(){
background(10,20,50);
fill(255);
textSize(16);
textAlign(LEFT,TOP);
text('SCORE: '+score,8,8);
if(gameOver){
fill(255,50,50);
textSize(48);
textAlign(CENTER,CENTER);
text('GAME OVER',width/2,height/2-20);
rectMode(CENTER);
fill(100);
rect(width/2,height/2+30,160,40,6);
fill(255);
textSize(16);
text('R to Retry or Click',width/2,height/2+30);
return;
}
if(keyIsDown(LEFT_ARROW)){
player.vx=-3;
}else if(keyIsDown(RIGHT_ARROW)){
player.vx=3;
}else{
player.vx=0;
}
player.prevY=player.y;
player.vy+=gravity;
if(player.vy>maxFallSpeed){player.vy=maxFallSpeed;}
player.x+=player.vx;
player.y+=player.vy;
if(player.x<0){player.x=0;}
if(player.x>width-player.w){player.x=width-player.w;}
player.onPlatform=false;
var prevOnPlatform=lastFrameOnPlatform;
lastFrameOnPlatform=false;
for(var i=0;i<platforms.length;i++){
var p=platforms[i];
var prevBottom=player.prevY+player.h;
var currBottom=player.y+player.h;
var horizOverlap=(player.x+player.w>p.x && player.x<p.x+p.w);
if(player.vy>=0 && prevBottom<=p.y && currBottom>=p.y && horizOverlap){
player.y=p.y-player.h;
player.vy=0;
player.canJump=true;
if(p.isGround){
lastFrameOnPlatform=false;
player.onPlatform=false;
}else{
player.onPlatform=true;
lastFrameOnPlatform=true;
}
}
}
if(prevOnPlatform && player.y+player.h>=platforms[0].y && platforms[0]){
if(player.onPlatform===false && platforms[0]){
gameOver=true;
}
}
for(var i=coins.length-1;i>=0;i--){
var c=coins[i];
var pxCenter=player.x+player.w/2;
var pyCenter=player.y+player.h/3;
var dx=pxCenter-c.x;
var dy=pyCenter-c.y;
var distSq=dx*dx+dy*dy;
var rad=(player.w/2+c.r);
if(distSq<rad*rad){
coins.splice(i,1);
score+=10;
}
}
fill(120);
for(var i=0;i<platforms.length;i++){
var p=platforms[i];
rect(p.x,p.y,p.w,p.h);
}
for(var i=0;i<coins.length;i++){
var c=coins[i];
drawStar(c.x,c.y,c.r);
}
fill(200,50,50);
noStroke();
var ax=player.x+player.w/2;
var ay=player.y;
var blx=player.x;
var bly=player.y+player.h;
var brx=player.x+player.w;
var bry=player.y+player.h;
triangle(ax,ay,blx,bly,brx,bry);
}
function keyPressed(){
if(keyCode===32 && !gameOver){
if(player.canJump){
player.vy=jumpForce;
player.canJump=false;
}
}
if((key==='r' || key==='R') && gameOver){
resetGame();
}
}
function mousePressed(){
if(gameOver){
var bx=width/2-80;
var by=height/2+30-20;
var bw=160;
var bh=40;
if(mouseX>=bx && mouseX<=bx+bw && mouseY>=by && mouseY<=by+bh){
resetGame();
}
}
}
function drawStar(cx,cy,r){
push();
translate(cx,cy);
noStroke();
fill(255,204,0);
beginShape();
var rot=PI/2*3;
var x=0;
var y=0;
var step=PI/5;
for(var i=0;i<5;i++){
x=cos(rot)*r;
y=sin(rot)*r;
vertex(x,y);
rot+=step;
x=cos(rot)*r*0.5;
y=sin(rot)*r*0.5;
vertex(x,y);
rot+=step;
}
endShape(CLOSE);
pop();
}
function randomInt(a,b){
return Math.floor(random(a,b+1));
}
