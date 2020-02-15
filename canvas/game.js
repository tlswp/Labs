var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
class Players {
  constructor(playerImageLink, sx, sy, sw, sh, dx, dy, dw, dh) {
    this.playerImage = new Image();
    this.playerImage.src = playerImageLink;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;
    this.speed = 2;
    this.frame = 0;
    this.keyW = false;
    this.keyA = false;
    this.keyS = false;
    this.keyD = false;
  }
}
class Floor {
  constructor(imageSrc, dx, dy, dw, dh) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;
  };
  drawFloor() {
    ctx.drawImage(this.image, this.dx, this.dy, this.dw, this.dh);
  }
}
var floors = [];

function generateFloor(count) {
  var x = 0;
  var y = 0;
  for (var floorsElement = 0; floorsElement < count; floorsElement++) {
    floors[floorsElement] = new Floor('img/floor.jpg', x, 300, 50, 50);
    x += 50;
  }
  floors[2] = new Floor('img/floor.jpg', 100, 250, 50, 50);
  floors[14] = new Floor('img/floor.jpg', 100, 125, 50, 50);
}
generateFloor(15);

function keysPressed(event) {
  switch (event.code) {
    case 'KeyD':
      Player.KeyD = true;
      break;
    case 'KeyA':
      Player.KeyA = true;
      break;
    case 'KeyS':
      Player.KeyS = true;
      break;
    case 'KeyW':
      Player.KeyW = true;
      break;
  }
}

function keysUp(event) {
  Player.frame = 0;
  switch (event.code) {
    case 'KeyD':
      Player.KeyD = false;
      Player.sx = 0;
      break;
    case 'KeyA':
      Player.KeyA = false;
      Player.sx = 0;
      break;
    case 'KeyS':
      Player.KeyS = false;
      Player.frame = 2;
      if (Player.frame >= 0) {
        Player.frame -= 1;
      }
      Player.sx = Player.sw * (Player.frame - 1);
      break;
    case 'KeyW':
      Player.KeyW = false;
      break;
  }
}
var speed = 0;

function move() {
  if (Player.KeyW === true) {
    Player.dy -= 9;
  }
  if (Player.KeyD === true && Player.KeyS !== true) {
    Player.sy = 710;
    Player.frame = Player.frame % 8 + 1;
    Player.sx = 64 * Player.frame;
    Player.dx += Player.speed;
  }
  if (Player.KeyA === true && Player.KeyS !== true) {
    Player.sy = 582;
    Player.frame = Player.frame % 8 + 1;
    Player.sx = 64 * Player.frame;
    Player.dx -= Player.speed;
  }
  if (Player.KeyS === true && Player.KeyA !== true && Player.KeyD !== true) {
    Player.sy = 1285;
    if (Player.frame < 3) {
      Player.frame += 1;
    }
    Player.sx = 64 * Player.frame;
  }
}
Player = new Players('img/nigg.png', 0, 710, 64, 64, 50, 50, 64, 64);
var tickCount = 0;

function physics() {
  tickCount = 10;
  var gravitationCount = 1,
    height = 64 - 8,
    y = 8,
    width = 64 - 22,
    x = 22;
  window.addEventListener('keydown', keysPressed);
  window.addEventListener('keyup', keysUp);
  for (var floorsElement = 0; floorsElement < floors.length; floorsElement++) {
    if ((floors[floorsElement].dy + floors[floorsElement].dh) - (Player.dy + y) === 0 &&
      ((floors[floorsElement].dx <= Player.dx + width && Player.dx + width < floors[floorsElement].dx + floors[floorsElement].dw) ||
        (floors[floorsElement].dx + floors[floorsElement].dw >= Player.dx + x && floors[floorsElement].dx <= Player.dx + width))) {
      Player.dy += 1;
      tickCount = 1000 / 30;
      console.log(floors[floorsElement].dx + '>' + (Player.dx + width))
    }
    if (floors[floorsElement].dy - (Player.dy + height) === 0 &&
      ((floors[floorsElement].dx <= Player.dx + width && Player.dx + width < floors[floorsElement].dx + floors[floorsElement].dw) ||
        (floors[floorsElement].dx + floors[floorsElement].dw >= Player.dx + x && floors[floorsElement].dx <= Player.dx + width))) {
      gravitationCount = 0;
      console.log(floors[floorsElement].dx + '>' + (Player.dx + width))
    }
    if (Player.dy + height > floors[floorsElement].dy && Player.dy + y < floors[floorsElement].dy + floors[floorsElement].dh &&
      Player.dx + width === floors[floorsElement].dx) {
      Player.dx -= 2;
    }
    if (Player.dy + height > floors[floorsElement].dy && Player.dy + y < floors[floorsElement].dy + floors[floorsElement].dh &&
      Player.dx + x === floors[floorsElement].dx + floors[floorsElement].dw) {
      Player.dx += 2;
    }
  }
  Player.dy += gravitationCount;
}

function draw() {
  move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var floorsElement = 0; floorsElement < floors.length; floorsElement++) {
    floors[floorsElement].drawFloor();
  }
  ctx.drawImage(Player.playerImage, Player.sx, Player.sy, Player.sw, Player.sh, Player.dx, Player.dy, Player.dw, Player.dh);
}
setInterval(physics, tickCount);
setInterval(draw, 1000 / 30);
window.onload = function() {

}