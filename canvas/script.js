var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var Player = new Object();
var player = new Image();
var i = 0;
player.src = 'img/nigg.png';
Player.xPos = 0;
Player.yPos = 0;
Player.x = Player.xPos;
Player.y = Player.yPos;
var link = 0;
Player.speed = 2;
Player.sw = 50;
Player.sh = 64;
Player.sy = 710;
Player.sx = 0;
Player.dx = 0;
Player.dy = 0;
Player.dw = 50;
Player.dh = 64;
Player.walk = new Audio();
Player.walk.src = 'audio/au2.wav';
var floor = new Image();
floor.src = 'img/floor.jpg';

Player.grav = 9
Player.grav = 0;

function pos() {
  Player.xPos = 0;
  Player.yPos = 0;
}
class Floor {
  constructor(imageSrc, dx, dy, dw, dh, floorN) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;
    this.floorN = floorN;
    setInterval(this.gravitationFloor.bind(this), 1000 / 30);

  }
  drawFloor() {
    ctx.drawImage(this.image, this.dx, this.dy, this.dw, this.dh);
  }
  gravitationFloor() {
    var c = 0;
    var b = 0;
    this.floorSt = false;
    if (b === 0) {
      if ( //this.dy >= Player.dy + Player.dh && //(this.dx <= Player.dx + Player.dw && Player.dx <= this.dx + this.dw) &&
        ((this.dx <= Player.dx && Player.dx <= this.dx + this.dw) || (Player.dx + Player.dw >= this.dx - 10 && Player.dx + Player.dw <= this.dx + this.dw + 10))) {
        b = 3;
        if (this.dx - 10 <= Player.dx && Player.dx <= this.dx + this.dw + 10 && Player.dx + Player.dw >= this.dx - 10 && Player.dx + Player.dw <= this.dx + this.dw + 10) {
          this.floorSt = true;
          //b = -3;
        }
        // if (this.floorSt) {
        //   b = 0;
        // }
        if (this) {

        }
        if (this.dy - (Player.dy + Player.dh) <= 2 && this.dy - (Player.dy + Player.dh) <= 0) {
          b = 0;
        }
      }
    }
    // if ((this.dx <= Player.dx && Player.dx <= this.dx + this.dw && this.dy === Player.dy + Player.dh)) {
    //   b = 9;
    //   Player.dy = this.dy - Player.dh;
    //   console.log(' ' + this.floorN + ' ')
    // }
    if (Player.dy + Player.dh >= this.dy && Player.dx + Player.dw === this.dx) {
      c = 2;
      console.log(this.dy - (Player.dy + Player.dh))
    }
    Player.dy += b;
    Player.dx -= c;
  }
}
var floors = [];

function generateFloor() {
  var x = 0;
  var y = 0;
  for (var i = 0; i < 15; i++) {
    if (i !== 2) {
      floors[i] = new Floor('img/floor.jpg', x, 300, 50, 50, i);
      x += 50;
    }
    if (i === 2) {
      floors[2] = new Floor('img/floor.jpg', 100, 250, 50, 50, 2);
      x += 50;
    }
    floors[i].drawFloor();
  }
}
generateFloor();
//var floor1 = new Floor('img/floor.jpg', 20, 300, 50, 50);
function drawFloors() {
  for (var i = 0; i < 15; i++) {
    floors[i].drawFloor();
    if (floors[i].grav === false) {

    }
  }
}
Player.stopper = 0;

function walk(event = 0) {
  switch (event.code) {
    case 'KeyD':
      Player.KeyD = 1;
      break;
    case 'KeyA':
      // i = i % 8 + 1;
      // Player.sx = 65 * i;
      Player.KeyA = 1;
      break;
    case 'KeyS':
      Player.KeyS = 1;
      break;
    case 'KeyW':
      Player.KeyW = 1;
      break;
  }
  //alert(walkR.left + walkR.right)
}
Player.stopper1 = 0;

function standing() {
  i = 0;
  if (event.code == 'KeyD') {
    Player.KeyD = 0;
    Player.sx = 0
  }
  if (event.code == 'KeyA') {
    Player.KeyA = 0;
    Player.sx = 0;
  }
  if (event.code == 'KeyS') {
    Player.KeyS = 0;
    i = 3;
    if (i > 0) {
      i -= 1;
    }
    Player.sx = 64 * i;
  }
  if (event.code == 'KeyW') {
    Player.KeyW = 0;
    //alert(250 - Player.dy + Player.dh);
    if (300 - (Player.dy + Player.dh) < 11) {
      Player.stopper = 0;
      Player.stopper1 = 0;
    }
  }
  Player.x = 0;
  Player.y = 0;
}
speed = [15, 50, 11, 8, 7, 6, 5, 4, 3, 2];
this.draw = setTimeout(function tick() {
  if (Player.KeyD == 1) {
    Player.sy = 710;
    i = i % 8 + 1;
    Player.sx = 64 * i;
    Player.dx += Player.speed;
  }
  if (Player.KeyA == 1) {
    Player.sy = 582;
    i = i % 8 + 1;
    Player.sx = 64 * i;
    Player.dx -= Player.speed;
    //walkR.right = 1;
  }
  if (Player.KeyS == 1) {
    Player.sy = 1285;
    if (i < 3) {
      i += 1;
    }
    Player.sx = 64 * i;
  }
  if (Player.KeyS == 0 && Player.KeyA !== 1 && Player.KeyD !== 1 && Player.KeyW !== 1) {
    if (i > 0) {
      i -= 1;
    }
    Player.sx = 64 * i;
  }
  if (Player.KeyW == 1 && Player.stopper === 0) {
    Player.stopper1 += 1;
    Player.dy -= speed[Player.stopper1];
  }
  if (Player.stopper1 > 8) {
    Player.stopper = 1;
  }
  //Player.x = 0;
  //Player.y = 0;
  document.addEventListener('keydown', walk);
  //Player.dx += Player.x;
  // Player.dy += Player.y;
  document.addEventListener('keyup', standing);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFloors();
  Player.dy += Player.grav
  ctx.drawImage(player, Player.sx, Player.sy, Player.sw, Player.sh, Player.dx, Player.dy, Player.dw, Player.dh);
  this.draw = setTimeout(tick, 1000 / 30);
}, 1000 / 30);
//player.onload = draw;