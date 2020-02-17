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
    this.speed = 10;
    this.frame = 0;
    this.keyW = false;
    this.keyA = false;
    this.keyS = false;
    this.keyD = false;
    this.ShiftLeft = false;
  }
}
Sceleton = new Players('img/sceleton.png', 0, 710, 64, 64, 550, 244, 64, 64);
var jumpPressed = false;
var jumpCount = 0;
var jumpLength = 55;
var jumpHeight = 0;
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
class Coin {
  constructor(imageSrc, sx, sy, sw, sh, dx, dy, dw, dh) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.dw = dw;
    this.dh = dh;
    this.frame = 0;
    this.coin = true;
  };
  drawCoin() {
    ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
  }
}
var floors = [],
  coins = [];

function generateCoins(count) {
  var x = 100;
  for (var coin = 0; coin < count; coin++) {
    coins[coin] = new Coin('img/coin.png', 0, 0, 16, 16, x + 25, 100 - 16, 16, 16);
    x += 50;
  }
}
generateCoins(3);

function loop() {
  if (Player.dx >= cvs.width - 100) {
    for (var floorsElement = 0; floorsElement < floors.length; floorsElement++) {
      floors[floorsElement].dx -= 1;
    }
    Sceleton.dx -= 1;
    Player.dx = cvs.width - 101;
  }
  if (Player.dx <= 100) {
    for (var floorsElement = 0; floorsElement < floors.length; floorsElement++) {
      floors[floorsElement].dx += 1;
    }
    Sceleton.dx += 1;
    Player.dx = 101;
  }
}

function generateFloors(count) {
  var x = 0;
  var y = 0;
  for (var floorsElement = 0; floorsElement < count; floorsElement++) {
    floors[floorsElement] = new Floor('img/floor.jpg', x, 300, 50, 50);
    x += 50;
  }
  floors[23] = new Floor('img/floor.jpg', 100, 250, 50, 50);
  floors[24] = new Floor('img/floor.jpg', 100, 125, 50, 50);
  floors[22] = new Floor('img/floor.jpg', 200, 250, 50, 50);
  floors[21] = new Floor('img/floor.jpg', 200, 125, 50, 50);
  floors[22] = new Floor('img/floor.jpg', 200, 250, 50, 50);
  floors[21] = new Floor('img/floor.jpg', 300, 200, 50, 50);
  floors[20] = new Floor('img/floor.jpg', 150, 125, 50, 50);
  floors[19] = new Floor('img/floor.jpg', 200, 125, 50, 50);
  floors[18] = new Floor('img/floor.jpg', 400, 150, 50, 50);
  floors[5] = new Floor('img/floor.jpg', 400, 200, 50, 50);
  floors[6] = new Floor('img/floor.jpg', 400, 250, 50, 50);
  floors[7] = new Floor('img/floor.jpg', 450, 150, 50, 50);
  floors[13] = new Floor('img/floor.jpg', 600, 250, 50, 50);
  x = 700
  for (var floorsElement = 24; floorsElement < count; floorsElement++) {
    floors[floorsElement] = new Floor('img/floor.jpg', x, 300, 50, 50);
    x += 50;
  }
  floors[49] = new Floor('img/floor.jpg', 550, 200, 50, 50);
}

generateFloors(50);

function keysPressed(event) {
  //alert(event.code);
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
    case 'ShiftLeft':
      Player.ShiftLeft = true;
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
    case 'ShiftLeft':
      Player.ShiftLeft = false;
      break;
  }
}

function moveAnimation() {
  if (Player.KeyW === true) {}
  if (Player.KeyW !== false) {}
  if (Player.KeyD === true && Player.KeyS !== true) {
    Player.sy = 710;
    Player.frame = Player.frame % 8 + 1;
    Player.sx = 64 * Player.frame;
  }
  if (Player.KeyA === true && Player.KeyS !== true) {
    Player.sy = 582;
    Player.frame = Player.frame % 8 + 1;
    Player.sx = 64 * Player.frame;
  }
  if (Player.KeyS === true && Player.KeyA !== true && Player.KeyD !== true) {
    Player.sy = 1285;
    if (Player.frame < 3) {
      Player.frame += 1;
    }
    Player.sx = 64 * Player.frame;
  }
}
Player = new Players('img/rickardo.png', 0, 710, 64, 64, 450, 50, 64, 64);
var jumpSpeed = [];

function SceletonAnimation() {
  if (Sceleton.route) {
    Sceleton.sy = 710;
    Sceleton.frame = Sceleton.frame % 8 + 1;
    Sceleton.sx = 64 * Sceleton.frame;
  }
  if (!Sceleton.route) {
    Sceleton.sy = 582;
    Sceleton.frame = Sceleton.frame % 8 + 1;
    Sceleton.sx = 64 * Sceleton.frame;
  }
}

function SceletonMove() {
  if (Sceleton.route) { Sceleton.dx += 1; }
  if (!Sceleton.route) { Sceleton.dx -= 1; }
}

function SceletonPhysics() {
  var height = 64 - 8,
    y = 8,
    width = 64 - 22,
    x = 22;
  for (var floorsElement = 0; floorsElement < floors.length; floorsElement++) {
    if (Sceleton.dy + height > floors[floorsElement].dy && Sceleton.dy + y < floors[floorsElement].dy + floors[floorsElement].dh &&
      Sceleton.dx + width === floors[floorsElement].dx) {
      Sceleton.route = false;
    }
    if (Sceleton.dy + height > floors[floorsElement].dy && Sceleton.dy + y < floors[floorsElement].dy + floors[floorsElement].dh &&
      Sceleton.dx + x === floors[floorsElement].dx + floors[floorsElement].dw) {
      Sceleton.route = true;
    }
  }
  if (Sceleton.dy + height > Player.dy - y && Sceleton.dy + y < Player.dy + height &&
    Sceleton.dx + width > Player.dx + x && Sceleton.dx + x < Player.dx + width) {
    Player.dx = 0;
    Player.dy = 0;
  }
}

function generateJumpSpeed() {
  jumpSpeed = [];
  jumpSpeedReverse = [];
  for (var jumpCount = 1; jumpCount < jumpLength / 2; jumpCount++) {
    if (jumpCount % 2 === 1) {
      jumpSpeed.push(jumpCount / 10);
      jumpSpeedReverse.push(jumpCount / 10);
    }
  }
  jumpSpeed = jumpSpeed.concat(jumpSpeedReverse.reverse())
}
generateJumpSpeed()
var jump = setTimeout(function tick() {
  if (jumpPressed) {
    Player.dy -= 1;
    jumpCount++;
  }
  if (Player.KeyW === true) {
    jumpPressed = true;
  }
  if (jumpCount > jumpLength) {
    jumpPressed = false;
    jumpHeight = 0;
  }
  jump = setTimeout(tick, jumpSpeed[jumpCount]);
}, jumpSpeed[jumpCount])

var move = setTimeout(function tick() {
  if (Player.KeyD === true && Player.KeyS !== true) {
    Player.dx += 1;
  }
  if (Player.KeyA === true && Player.KeyS !== true) {
    Player.dx -= 1;
  }
  if (Player.ShiftLeft === true) {
    Player.speed = 5;
  }
  if (Player.ShiftLeft === false) {
    Player.speed = 10;
  }
  move = setTimeout(tick, Player.speed)
}, Player.speed)

function physics() {
  if (jumpPressed) {
    Player.gravitationCount = 0;
  }
  if (!jumpPressed) {
    Player.gravitationCount = 1
  }
  var height = 64 - 8,
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
    }
    if (floors[floorsElement].dy - (Player.dy + height) === 0 &&
      ((floors[floorsElement].dx <= Player.dx + width && Player.dx + width < floors[floorsElement].dx + floors[floorsElement].dw) ||
        (floors[floorsElement].dx + floors[floorsElement].dw >= Player.dx + x && floors[floorsElement].dx <= Player.dx + width))) {
      Player.gravitationCount = 0;
      if (!jumpPressed) {
        jumpCount = 0;
      }
    }
    if (Player.dy + height > floors[floorsElement].dy && Player.dy + y < floors[floorsElement].dy + floors[floorsElement].dh &&
      Player.dx + width === floors[floorsElement].dx) {
      Player.dx -= 1;
    }
    if (Player.dy + height > floors[floorsElement].dy && Player.dy + y < floors[floorsElement].dy + floors[floorsElement].dh &&
      Player.dx + x === floors[floorsElement].dx + floors[floorsElement].dw) {
      Player.dx += 1;
    }
  }
  Player.dy += Player.gravitationCount;
}

function coinAnimation() {
  for (var coin = 0; coin < coins.length; coin++) {
    coins[coin].frame = coins[coin].frame % 8 + 1;
    coins[coin].sx = 16 * coins[coin].frame;
  }
}

function coinPhysics() {
  var height = 64 - 8,
    y = 8,
    width = 64 - 22,
    x = 22;
  for (var coin = 0; coin < coins.length; coin++) {
    if (coins[coin].dy > Player.dy - y && coins[coin].dy < Player.dy + height &&
      coins[coin].dx > Player.dx + x && coins[coin].dx < Player.dx + width && coins[coin].coin) {
      coins[coin].coin = false;
    }
  }
}

function draw() {
  SceletonMove();
  moveAnimation();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var floorsElement = 0; floorsElement < floors.length; floorsElement++) {
    floors[floorsElement].drawFloor();
  }
  for (var coin = 0; coin < coins.length; coin++) {
    if (coins[coin].coin) {
      coins[coin].drawCoin();
    }
  }
  ctx.drawImage(Player.playerImage, Player.sx, Player.sy, Player.sw, Player.sh, Player.dx, Player.dy, Player.dw, Player.dh);
  ctx.drawImage(Sceleton.playerImage, Sceleton.sx, Sceleton.sy, Sceleton.sw, Sceleton.sh, Sceleton.dx, Sceleton.dy, Sceleton.dw, Sceleton.dh);
}
setInterval(loop, 1);
setInterval(SceletonPhysics, 1);
setInterval(SceletonAnimation, 1000 / 15);
setInterval(coinAnimation, 1000 / 15);
setInterval(coinPhysics, 1);
setInterval(physics, 1);
setInterval(draw, 1000 / 30);
window.onload = function() {}