let player;
let bullets = [];
let enemies = [];
let spawnTimer = 0;
let spawnInterval = 60;
let score = 0;
let lives = 3;
let shootCooldown = 0;
let shootDelay = 10;
function setup(){createCanvas(480,640);player = {x: width/2, y: height-40, size: 24, speed: 5};textAlign(LEFT, TOP);textSize(16);}
function draw(){background(20);
if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){player.x -= player.speed;} 
if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)){player.x += player.speed;} 
player.x = constrain(player.x, player.size/2, width - player.size/2);
if (shootCooldown > 0){shootCooldown -= 1;} 
if ((keyIsDown(32) || mouseIsPressed) && shootCooldown <= 0){bullets.push({x: player.x, y: player.y - player.size/2, r: 4, speed: 8});shootCooldown = shootDelay;}
spawnTimer += 1; if (spawnTimer >= spawnInterval){spawnTimer = 0; let ex = random(20, width - 20); let es = random(1.5, 3.0); enemies.push({x: ex, y: -20, w: 28, h: 20, speed: es});}
for (let i = bullets.length - 1; i >= 0; i--){bullets[i].y -= bullets[i].speed; if (bullets[i].y < -10){bullets.splice(i, 1);}}
for (let i = enemies.length - 1; i >= 0; i--){enemies[i].y += enemies[i].speed; if (enemies[i].y > height + 30){enemies.splice(i, 1); lives -= 1; if (lives < 0){lives = 0;}}}
for (let i = enemies.length - 1; i >= 0; i--){for (let j = bullets.length - 1; j >= 0; j--){let dx = enemies[i].x - bullets[j].x; let dy = enemies[i].y - bullets[j].y; let distSq = dx * dx + dy * dy; let rSum = Math.max(enemies[i].w, enemies[i].h) / 2 + bullets[j].r; if (distSq <= rSum * rSum){enemies.splice(i, 1); bullets.splice(j, 1); score += 10; break;}}}
for (let i = enemies.length - 1; i >= 0; i--){let dx = enemies[i].x - player.x; let dy = enemies[i].y - player.y; let distSq = dx * dx + dy * dy; let rSum = Math.max(enemies[i].w, enemies[i].h) / 2 + player.size / 2; if (distSq <= rSum * rSum){enemies.splice(i, 1); lives -= 1; if (lives < 0){lives = 0;}}}
fill(0,150,255);noStroke();rectMode(CENTER);rect(player.x, player.y, player.size, player.size);
fill(255,255,0);for (let i = 0; i < bullets.length; i++){ellipse(bullets[i].x, bullets[i].y, bullets[i].r * 2, bullets[i].r * 2);} 
fill(255,80,80);for (let i = 0; i < enemies.length; i++){rectMode(CENTER);rect(enemies[i].x, enemies[i].y, enemies[i].w, enemies[i].h);} 
fill(255);textAlign(LEFT, TOP);textSize(16);text('Score: ' + score, 8, 8);text('Lives: ' + lives, 8, 28);
if (lives <= 0){fill(0,0,0,150);rectMode(CORNER);rect(0,0,width,height);fill(255);textSize(32);textAlign(CENTER, CENTER);text('GAME OVER', width/2, height/2);noLoop();}}
