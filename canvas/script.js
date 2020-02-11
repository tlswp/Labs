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
Player.sw = 65;
Player.sh = 70;
Player.sy = 710;
Player.sx = 0;
Player.dx = 0;
Player.dy = 0;
Player.dw = 65;
Player.dh = 70;
Player.walk = new Audio();
Player.walk.src = 'audio/au2.wav';
var floor = new Image();
floor.src = 'img/floor.jpg';

function pos() {
  Player.xPos = 0;
  Player.yPos = 0;
}
class Floor {
  constructor(imageSrc, dx, dy, dw, dh) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;
    setInterval(this.cont.bind(this), 1000 / 30);
    // setInterval(this.drawFloor.bind(this), 1000 / 30);
    // setInterval(this.gravitationFloor.bind(this), 1000 / 30);

  }
  drawFloor() {
    ctx.drawImage(this.image, this.dx, this.dy, this.dw, this.dh);
  }
  gravitationFloor() {
    if (this.dy >= Player.dy + Player.dh && (this.dx <= Player.dx + Player.dw && this.dx + this.dw >= Player.dx)) {
      console.log(this.dy + ' floor');
      Player.dy += 9;
    }
    if ((this.dx >= Player.dx + Player.dw && this.dx + this.dw <= Player.dx)) {
      console.log(this.dy + ' floor');
      Player.dy += 2;
    }
  }
  cont = function() {
    draw();
    this.drawFloor();
    this.gravitationFloor();
  }
}
//var floor1 = new Floor('img/floor.jpg', 20, 300, 50, 50);
var floors = [];

function generateFloor() {
  var x = 0;
  var y = 0;
  for (var i = 0; i < 15; i++) {
    floors[i] = new Floor('img/floor.jpg', x, 300, 50, 50);
    x += 50;
  }
}

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
      if (Player.yPos <= 450) {
        //Player.yPos += 6;
        walkR.top = -9;
      }
      if (Player.yPos >= 450) {
        //Player.yPos += 0;
        walkR.top = 0;
      }
      break;
  }
  //alert(walkR.left + walkR.right)
}

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
    i = 5;
    if (i > 0) {
      i -= 1;
    }
    Player.sx = 64 * i;
  }
  if (event.code == 'KeyW') {
    Player.KeyW = 0;
  }
  Player.x = 0;
  Player.y = 0;
}

// function gravitation(gravitationStatus = 1) {
//   if (gravitationStatus = 1) {
//     if (Player.dy <= 400) {
//       //Player.yPos += 6;
//       return 6;
//     }
//     if (Player.dy >= 400) {
//       //Player.yPos += 0;
//       return 0;
//     }
//   }
// }

function draw() {
  console.log(Player.dy + ' player');
  if (Player.KeyD == 1) {
    Player.sy = 710;
    i = i % 8 + 1;
    Player.sx = 64 * i;
    Player.dx += 2;
  }
  if (Player.KeyA == 1) {
    Player.sy = 582;
    i = i % 8 + 1;
    Player.sx = 64 * i;
    Player.dx -= 2;
    //walkR.right = 1;
  }
  if (Player.KeyS == 1) {
    Player.sy = 1285;
    if (i < 5) {
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
  if (Player.KeyW == 1) {
    Player.dy -= 15;
  }
  //Player.x = 0;
  //Player.y = 0;
  document.addEventListener('keydown', walk);
  //Player.dx += Player.x;
  // Player.dy += Player.y;
  document.addEventListener('keyup', standing);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, Player.sx, Player.sy, Player.sw, Player.sh, Player.dx, Player.dy, Player.dw, Player.dh);
  //requestAnimationFrame(draw);
  //gravitation()
}
generateFloor();
//setInterval(draw, 1000 / 30);
//player.onload = draw;