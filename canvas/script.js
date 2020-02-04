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


function pos() {
  Player.xPos = 0;
  Player.yPos = 0;
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
  console.log(Player.x)
  Player.x = walkR.left + walkR.right;
  Player.y = walkR.top;
  return walkR;
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

function gravitation(gravitationStatus = 1) {
  if (gravitationStatus = 1) {
    if (Player.dy <= 400) {
      //Player.yPos += 6;
      return 6;
    }
    if (Player.dy >= 400) {
      //Player.yPos += 0;
      return 0;
    }
  }
}

function draw() {
  if (Player.KeyD == 1) {
    Player.sy = 710;
    i = i % 8 + 1;
    Player.sx = 64 * i;
    Player.dx += 1;
  }
  if (Player.KeyA == 1) {
    Player.sy = 582;
    i = i % 8 + 1;
    Player.sx = 64 * i;
    Player.dx -= 1;
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
    var startPosition = Player.dy;
    if (startPosition <= 420 && startPosition >= 350) {
      if (startPosition - Player.dy <= 50) {
        Player.dy -= 15;
      }
    }
  }
  //Player.x = 0;
  //Player.y = 0;
  document.addEventListener('keydown', walk);
  Player.dx += Player.x;
  Player.dy += Player.y + gravitation();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.addEventListener('keyup', standing)
  ctx.drawImage(player, Player.sx, Player.sy, Player.sw, Player.sh, Player.dx, Player.dy, Player.dw, Player.dh);
  //requestAnimationFrame(draw);
  //gravitation()
}
setInterval(draw, 1000 / 30);
//player.onload = draw;