var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var Player = new Object();
var player = new Image();
player.src = 'img/pt1.png';
Player.xPos = 0;
Player.yPos = 0;
var link = 0;
Player.sizeX = 128;
Player.sizeY = 170;

function walk() {
  if (event.code == 'KeyD') {
    Player.xPos += 2;
    //player.src = 'img/pt1.png'
    if (link === 'img/pt3.png') {
      player.src = 'img/pt2.png';
      //link = 'img/pt2.png';
      setTimeout(function() { link = 'img/pt2.png'; }, 100)
    } else {
      player.src = 'img/pt3.png';
      setTimeout(function() { link = 'img/pt3.png'; }, 100)
    }
    console.log(player.src);
  }
  if (event.code == 'KeyA') {
    Player.xPos -= 1;
    player.src = 'img/pt1Left.png';
  }
  if (event.code == 'KeyS') {
    Player.yPos += 1;
  }
  if (event.code == 'KeyW') {
    var i = 0;
    if (i < 100) {
      Player.yPos -= 12;
      i += 12;
    }
  }
}

function standing() {
  if (event.code == 'KeyD') {
    player.src = 'img/pt1.png';
    link = 'img/pt2.png';
  }
  if (event.code == 'KeyA') {
    player.src = 'img/pt1Left.png';
    link = 'img/pt2.png';
  }
}

function gravitation() {
  if ((Player.yPos - 0.5 * Player.sizeY) <= (cvs.offsetHeight - 500)) {
    Player.yPos += 6;
  }
  if (Player.yPos - 0.5 * Player.sizeY >= cvs.offsetHeight - 500) {
    Player.yPos += 0;
  }
}

function draw() {
  console.log(cvs.offsetHeight - 500 - Player.yPos)
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 10000, 10000);
  document.addEventListener('keydown', walk);
  document.addEventListener('keyup', standing)
  ctx.drawImage(player, Player.xPos, Player.yPos, Player.sizeX, Player.sizeY);
  requestAnimationFrame(draw);
  //gravitation()
}
player.onload = draw;
player.src = 'img/pt1.png'