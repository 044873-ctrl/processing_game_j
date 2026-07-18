let CANVAS_W=400;
let CANVAS_H=600;
let bullets=[];
let enemies=[];
let particles=[];
let stars=[];
let player={x:CANVAS_W/2,y:CANVAS_H-50,r:16,speed:5};
let score=0;
let gameOver=false;
function setup(){createCanvas(CANVAS_W,CANVAS_H);player.x=width/2;player.y=height-50;for(let i=0;i<30;i++){stars.push({x:random(0,width),y:random(0,height),r:random(1,3),s:random(1,3)})}textSize(16);textAlign(LEFT,TOP)}
function resetGame(){score=0;gameOver=false;bullets=[];enemies=[];particles=[];player.x=width/2;player.y=height-50;for(let i=0;i<stars.length;i++){stars[i].y=random(0,height);stars[i].x=random(0,width)}}
function draw(){background(0);for(let i=0;i<stars.length;i++){let s=stars[i];s.y+=s.s;if(s.y>height){s.y=0;s.x=random(0,width)}fill(255);noStroke();ellipse(s.x,s.y,s.r,s.r)}if(!gameOver){if(keyIsDown(LEFT_ARROW)){player.x-=player.speed}if(keyIsDown(RIGHT_ARROW)){player.x+=player.speed}player.x=constrain(player.x,player.r,width-player.r)}for(let i=bullets.length-1;i>=0;i--){let b=bullets[i];b.y-=b.speed;fill(50,200,255);noStroke();ellipse(b.x,b.y,b.r*2,b.r*2);if(b.y+b.r<0){bullets.splice(i,1)}}if(frameCount%60===0 && !gameOver){let er=12;let ex=random(er,width-er);enemies.push({x:ex,y:-er,r:er,speed:2})}for(let i=enemies.length-1;i>=0;i--){let e=enemies[i];e.y+=e.speed;fill(255,80,80);noStroke();ellipse(e.x,e.y,e.r*2,e.r*2);if(!gameOver){if(dist(e.x,e.y,player.x,player.y)<=e.r+player.r){gameOver=true}}if(e.y-e.r>height){enemies.splice(i,1)}}for(let ei=enemies.length-1;ei>=0;ei--){let e=enemies[ei];let killed=false;for(let bi=bullets.length-1;bi>=0;bi--){let b=bullets[bi];if(dist(e.x,e.y,b.x,b.y)<=e.r+b.r){for(let p=0;p<5;p++){let ang=random(0,TWO_PI);let sp=random(1,3);particles.push({x:e.x,y:e.y,vx:cos(ang)*sp,vy:sin(ang)*sp,r:3,life:20})}bullets.splice(bi,1);enemies.splice(ei,1);score+=100;killed=true;break}}if(killed){break}}for(let i=particles.length-1;i>=0;i--){let p=particles[i];p.x+=p.vx;p.y+=p.vy;p.life-=1;fill(255,200,0);noStroke();ellipse(p.x,p.y,p.r*2,p.r*2);if(p.life<=0){particles.splice(i,1)}}fill(0,0,255);noStroke();ellipse(player.x,player.y,player.r*2,player.r*2);fill(255);text('Score: '+score,8,8);if(gameOver){fill(0,0,0,150);rect(0,0,width,height);fill(255);textAlign(CENTER,CENTER);textSize(32);text('GAME OVER',width/2,height/2);textSize(16);textAlign(LEFT,TOP)}}
function keyPressed(){if(!gameOver){if(key===' '||keyCode===32){bullets.push({x:player.x,y:player.y-player.r,r:4,speed:8})}}if(gameOver && (key==='r'||key==='R')){resetGame()}}
