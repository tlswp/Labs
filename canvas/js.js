document.getElementById("game");
ctx = example.getContext('2d');
levelOne = [1, [1, 2],
  [1, 2], 1, 2
];
CharacterClass = {
  health: 100,
  grav: 5,
  speed: 5,
  sizeX: 20,
  sizeY: 20,
  xPos: 0,
  yPos: 0,
  falling: false
}
var Player = CharacterClass;
var player = new Image();
var terrain = new Image();
var fon = new Image();
player.src = 'player.png';
terrain.src = 'terrain.jpg';
fon.src = 'fon.jpg';

function generateLevel() {
  for (let i = 0; i < levelOne.length; i++) {
    if (typeof levelOne[i] === 'object') {
      for (let k = 0; k < levelOne[i].length; k++) {
        if (Player.yPos - 0.5 * Player.sizeY === levelOne[i][k] * -30 + example.height) {
          Player.grav = 0;
        }
        ctx.drawImage(terrain, i * 100, levelOne[i][k] * -30 + example.height, 100, 30);
      }
    } else {
      if (Player.yPos - 0.5 * Player.sizeY === levelOne[i] * -30 + example.height) {
        Player.grav = 0;
      }
      ctx.drawImage(terrain, i * 100, levelOne[i] * -30 + example.height, 100, 30);
    }
  }
}

function draw() {
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(fon, 0, 0);
  ctx.drawImage(player, Player.xPos, Player.yPos, Player.sizeX, Player.sizeY);
  generateLevel();
  if (Player.yPos + 20 > example.height) {
    clearInterval(tick);
    console.log('died');
  }

}

function controlerPlayer(event) {
  if (event.keyCode !== undefined) {
    if (event.keyCode === 39) {
      Player.xPos += Player.speed;
    }
    if (event.keyCode === 37) {
      Player.xPos -= Player.speed;
      Player.grav = 0;
    }
  }
}
document.addEventListener('keydown', controlerPlayer);
var tick = setInterval(eventTick, 50);

function eventTick() {
  Player.yPos += Player.grav;
  terrain.y = Player.yPos;
  draw();
}