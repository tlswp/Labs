window.onload = function() {
  document.fullscreenEnabled = true;
  var cvs = document.getElementById('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = document.documentElement.clientWidth / 2;
  cvs.height = 0;
  class Background {
    constructor(imageSrc, dx, dy, dw, dh) {
      this.image = new Image();
      this.image.src = imageSrc;
      this.dx = dx;
      this.dy = dy;
      this.dw = dw;
      this.dh = dh;
    };
    draw() {
      ctx.drawImage(this.image, this.dx, this.dy, this.dw, this.dh);
    }
  }
  var backgroundsList = [];
  backgroundLayers = [];
  backgroundLayersSrc = [
      'backgroundLayers/Layer_0000_9.png', 'backgroundLayers/Layer_0001_8.png', 'backgroundLayers/Layer_0002_7.png', 'backgroundLayers/Layer_0003_6.png',
      'backgroundLayers/Layer_0005_5.png', 'backgroundLayers/Layer_0006_4.png',
      'backgroundLayers/Layer_0008_3.png', 'backgroundLayers/Layer_0009_2.png', 'backgroundLayers/Layer_0010_1.png'
    ]
    // backgroundLayersSrc = [
    //   'backgroundLayers/Layer_0000_9.png', 'backgroundLayers/Layer_0001_8.png', 'backgroundLayers/Layer_0002_7.png', 'backgroundLayers/Layer_0003_6.png',
    //   'backgroundLayers/Layer_0004_lights.png', 'backgroundLayers/Layer_0005_5.png', 'backgroundLayers/Layer_0006_4.png', 'backgroundLayers/Layer_0007_lights.png',
    //   'backgroundLayers/Layer_0008_3.png', 'backgroundLayers/Layer_0009_2.png', 'backgroundLayers/Layer_0010_1.png'
    // ]
  backgroundLayersSrc = backgroundLayersSrc.reverse();

  function generateBackgrounds(x, y) {
    var count = 0;
    var backgroundAdded = false;
    while (maxLength * 50 / 928 > count || !backgroundAdded) {
      backgroundAdded = true;
      console.log(maxLength * 50 / 928)
      var backgroundLayers = [];
      for (var background = 0; background < backgroundLayersSrc.length; background++) {
        backgroundLayers.push(new Background(backgroundLayersSrc[background], 928 * count, levelMaps[levelSelect - 1].length * 50 - 793, 928, 793));
      }
      backgroundsList.push(backgroundLayers);
      count += 1;
    }
  }
  class Characters {
    constructor(playerImageLink, sx, sy, sw, sh, dx, dy, dw, dh, character) {
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
      this.mapX = 0;
      this.mapY = 0;
      this.speed = 10;
      this.frame = 0;
      this.keyW = false;
      this.keyA = false;
      this.keyS = false;
      this.keyD = false;
      this.ShiftLeft = false;
      this.score = 0;
      this.jumpPressed = false;
      this.jumpCount = 0;
      this.jumpLength = 65;
      this.character = character;

    }
    checkHitBox() {
      this.hitBoxW = this.dx + this.dw - 22;
      this.hitBoxH = this.dy + this.dh - 8;
      this.hitBoxX = this.dx + 22;
      this.hitBoxY = this.dy + 8;
    }
  }
  var charactersList = [];
  var Player = new Characters('img/rickardo.png', 0, 710, 64, 64, 450, 50, 64, 64, 'player');
  var Sceleton = new Characters('img/sceleton.png', 0, 710, 64, 64, 550, 244, 64, 64, 'sceleton');
  class Floor {
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
    };
    drawFloor() {
      ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    }
  }
  class Collectibles {
    constructor(imageSrc, sx, sy, sw, sh, dx, dy, dw, dh, type) {
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
      this.notCollected = true;
      this.type = type;
    };
    drawCoin() {
      ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    }
    checkHitBox() {
      this.hitBoxW = this.dx + this.dw - 0;
      this.hitBoxH = this.dy + this.dh - 0;
      this.hitBoxX = this.dx + 0;
      this.hitBoxY = this.dy + 0;
    }
  }
  var floors = [],
    coins = [],
    collectiblesList = [],
    maxLength = [];

  function loop() {
    if (Player.dx >= cvs.width / 2 && maxLength * 50 - Player.mapX >= cvs.width / 2 + 0) {
      collisionObjectsList.forEach(collisionObjects => {
        collisionObjects.forEach(collisionObject => {
          collisionObject.dx -= 1;
        });
      });
      collectiblesList.forEach(collectibles => {
        collectibles.forEach(collectible => {
          collectible.dx -= 1;
        });
      });
      charactersList.forEach(character => {
        character.dx -= 1;
      });
      backgroundsList.forEach(backgroundLayers => {
        var count = 1;
        backgroundLayers.forEach(backgroundLayer => {
          backgroundLayer.dx -= count / (backgroundLayers.length);
          count += 1;
        });
      });
    }
    if (Player.dx <= (cvs.width / 2) - 5 && Player.mapX > cvs.width / 2) {
      collisionObjectsList.forEach(collisionObjects => {
        collisionObjects.forEach(collisionObject => {
          collisionObject.dx += 1;
        });
      });
      collectiblesList.forEach(collectibles => {
        collectibles.forEach(collectible => {
          collectible.dx += 1;
        });
      });
      charactersList.forEach(character => {
        character.dx += 1;
      });
      backgroundsList.forEach(backgroundLayers => {
        var count = 1;
        backgroundLayers.forEach(backgroundLayer => {
          backgroundLayer.dx += count / (backgroundLayers.length);
          count += 1;
        });
      });
    }
  }
  var levelMaps = [
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 3, 0, 3, 0, 3, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 3, 1],
      [1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
      [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 4, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 2, 0, 1, 0, 4, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 3, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1],
      [1, 2, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 0, 3, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 2, 1, 4, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 3, 3, 3, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 3, 0, 0, 1, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 3, 1, 0, 1, 1, 1, 0, 0, 3, 0, 0, 0, 1],
      [1, 3, 0, 1, 1, 0, 1, 0, 0, 3, 0, 1, 0, 3, 0, 1],
      [1, 1, 0, 0, 0, 4, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 1],
      [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 3, 0, 0, 0, 0, 0, 3, 3, 2, 3, 3, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 3, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 3, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 3, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 3, 0, 1, 0, 1, 0, 1, 0, 3, 0, 0, 0, 1],
      [1, 3, 3, 3, 4, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1],
      [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 1],
      [1, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 3, 1],
      [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 3, 1],
      [1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
  ]
  var levelMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
  var collisionObjectsList = [];
  var intersectionObjects = [];

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function generateLevel(levelMap) {
    var x = 0;
    var y = 0;
    for (var yCount = 0; yCount < levelMap.length; yCount++) {
      for (var xCount = 0; xCount < levelMap[yCount].length; xCount++) {
        if (levelMap[yCount][xCount] === 1) {
          floors.push(new Floor('img/floor.jpg', randomInteger(0, 3) * 512 / 4, randomInteger(0, 3) * 512 / 4, 512 / 4, 512 / 4, x, y, 50, 50))
        }
        if (levelMap[yCount][xCount] === 2) {
          Player.mapX = x;
          Player.dx = x;
          Player.dy = y - 20;
        }
        if (levelMap[yCount][xCount] === 3) {
          coins.push(new Collectibles('img/coin.png', 0, 0, 16, 16, x + 16, y + 16, 16, 16, 'coin'));
        }
        if (levelMap[yCount][xCount] === 4) {
          Sceleton = new Characters('img/sceleton.png', 0, 710, 64, 64, x, y - 20, 64, 64, 'sceleton');
        }
        x += 50;
      }
      y += 50;
      x = 0;
    }
    cvs.height = y;
    collectiblesList.push(coins);
    collisionObjectsList.push(floors);
    charactersList.push(Player);
    charactersList.push(Sceleton);
  }

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
    charactersList.forEach(character => {
      if (character.character === 'player') {
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
      if (character.character === 'sceleton') {
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
    });
  }

  function SceletonMove() {
    if (Sceleton.route) { Sceleton.dx += 1; }
    if (!Sceleton.route) { Sceleton.dx -= 1; }
    // if (character.character === 'sceleton') {
    //   if (character.route) { character.dx += 1; }
    //   if (!character.route) { character.dx -= 1; }
    // }
  }
  var Sounds = {
    gameOverSound: new Audio('audio/game-over-sound.wav'),
    gameOverVoice: new Audio('audio/game-over-voice.wav'),
    gameCoinSound: new Audio('audio/coin-sound.wav'),
    gameWinVoices: [new Audio('audio/win_voice_1.flac'), new Audio('audio/win_voice_2.flac'), new Audio('audio/win_voice_3.flac'), new Audio('audio/win_voice_4.flac'),
      new Audio('audio/win_voice_5.flac'), new Audio('audio/win_voice_6.flac'), new Audio('audio/win_voice_7.flac')
    ],
    gameWinSound: new Audio('audio/win_sound.wav'),
    gameMainThemeSound: new Audio('audio/main_theme.mp3')
  }

  function intersection(intersectionObjectList) {
    intersectionObjectList.forEach(intersectionObject => {
      intersectionObject.checkHitBox();
      Player.checkHitBox();
      if (intersectionObject.hitBoxH > Player.hitBoxY && intersectionObject.hitBoxY < Player.hitBoxH &&
        intersectionObject.hitBoxW > Player.hitBoxX && intersectionObject.hitBoxX < Player.hitBoxW) {
        if (intersectionObject.character === 'sceleton') {
          setTimeout(function() {
            Sounds.gameOverSound.currentTime = 0;
            Sounds.gameOverSound.volume = 0.2;
            Sounds.gameOverSound.play();
            Sounds.gameOverVoice.currentTime = 0;
            Sounds.gameOverVoice.volume = 0.8;
            Sounds.gameOverVoice.play();
            ctx.font = '48px Rubik Mono One';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', cvs.width / 2, cvs.height / 2);
          }, 100);
          close();
          setTimeout(function() {
            start(levelSelect - 1);
          }, 4500);
        }
        if (intersectionObject.type === 'coin' && intersectionObject.notCollected) {
          Sounds.gameCoinSound.currentTime = 0;
          Sounds.gameCoinSound.play();
          intersectionObject.notCollected = false;
          Player.score += 1;
          score.innerHTML = 'Счет: ' + Player.score + '/' + coins.length;
          if (Player.score >= intersectionObjectList.length) {
            var rNum = randomInteger(0, 6),
              winPhrases = ['You win!', 'Congratulation!', 'Success!', 'Awesome!', 'Yeah!', 'Great!', 'Amazing!', 'Fantastic!'];
            ctx.font = '48px Rubik Mono One';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(winPhrases[rNum], cvs.width / 2, cvs.height / 2);
            close();
            Sounds.gameWinSound.play();
            Sounds.gameWinVoices[rNum].play();
            console.log(Sounds.gameWinVoices[rNum].duration);
            setTimeout(function() {
              if (levelMaps.length > levelSelect) {
                Player.score = 0;
                score.innerHTML = 'Счет: ' + 0 + '/' + coins.length;
                levelSelect = +levelSelect;
                levelSelect += 1;
                start(levelSelect - 1);
              } else {
                ctx.clearRect(0, 0, cvs.width, cvs.height);
                ctx.font = '48px Rubik Mono One';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.fillText('Final', cvs.width / 2, cvs.height / 2);
              }
            }, 2000);
          }
        }
      }
    });
  }

  var jump = setTimeout(function tick() {
    if (Player.jumpPressed) {
      Player.dy -= 1;
      Player.jumpCount++;
    }
    if (Player.KeyW === true) {
      Player.jumpPressed = true;
    }
    if (Player.jumpCount > Player.jumpLength) {
      Player.jumpPressed = false;
    }
    jump = setTimeout(tick, +('0.' + Player.jumpCount));
  }, +('0.' + Player.jumpCount));

  var move = setTimeout(function tick() {
    if (Player.KeyD === true && Player.KeyS !== true) {
      Player.dx += 1;
      Player.mapX += 1;
    }
    if (Player.KeyA === true && Player.KeyS !== true) {
      Player.dx -= 1;
      Player.mapX -= 1;
    }
    if (Player.ShiftLeft === true) {
      Player.speed = 5;
    }
    if (Player.ShiftLeft === false) {
      Player.speed = 10;
    }
    move = setTimeout(tick, Player.speed)
  }, Player.speed);

  function physics() {
    charactersList.forEach(character => {
      if (character.jumpPressed) {
        character.gravitationCount = 0;
      }
      if (!character.jumpPressed) {
        character.gravitationCount = 1;
      }
      collisionObjectsList.forEach(collisionObjectArray => {
        collisionObjectArray.forEach(collisionObject => {
          character.checkHitBox();
          if ((collisionObject.dy + collisionObject.dh) - (character.hitBoxY) === 0 &&
            ((collisionObject.dx <= character.hitBoxW && character.hitBoxW < collisionObject.dx + collisionObject.dw) ||
              (collisionObject.dx + collisionObject.dw >= character.hitBoxX && collisionObject.dx <= character.hitBoxW))) {
            character.dy += 1;
          }
          if (collisionObject.dy - (character.hitBoxH) === 0 &&
            ((collisionObject.dx <= character.hitBoxW && character.hitBoxW < collisionObject.dx + collisionObject.dw) ||
              (collisionObject.dx + collisionObject.dw >= character.hitBoxX && collisionObject.dx <= character.hitBoxW))) {
            character.gravitationCount = 0;
            if (!character.jumpPressed) {
              character.jumpCount = 0;
            }
          }
          if (character.hitBoxH > collisionObject.dy && character.hitBoxY < collisionObject.dy + collisionObject.dh &&
            character.hitBoxW === collisionObject.dx) {
            character.dx -= 1;
            character.mapX -= 1;
            if (character.character === 'sceleton') {
              character.route = false;
            }
          }
          if (character.hitBoxH > collisionObject.dy && character.hitBoxY < collisionObject.dy + collisionObject.dh &&
            character.hitBoxX === collisionObject.dx + collisionObject.dw) {
            character.dx += 1;
            character.mapX += 1;
            if (character.character === 'sceleton') {
              character.route = true;
            }
          }
        });
      });
      character.dy += character.gravitationCount;
    });
    collectiblesList.forEach(collectibles => {
      intersection(collectibles);
    });
    intersection(charactersList);
  }

  function coinAnimation() {
    for (var coin = 0; coin < coins.length; coin++) {
      coins[coin].frame = coins[coin].frame % 8 + 1;
      coins[coin].sx = 16 * coins[coin].frame;
    }
  }

  function draw() {
    SceletonMove();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundsList.forEach(backgroundLayers => {
      backgroundLayers.forEach(backgroundLayer => {
        backgroundLayer.draw();
      });
    });
    for (var floorsElement = 0; floorsElement < floors.length; floorsElement++) {
      floors[floorsElement].drawFloor();
    }
    for (var coin = 0; coin < coins.length; coin++) {
      if (coins[coin].notCollected) {
        coins[coin].drawCoin();
      }
    }
    ctx.drawImage(Player.playerImage, Player.sx, Player.sy, Player.sw, Player.sh, Player.dx, Player.dy, Player.dw, Player.dh);
    ctx.drawImage(Sceleton.playerImage, Sceleton.sx, Sceleton.sy, Sceleton.sw, Sceleton.sh, Sceleton.dx, Sceleton.dy, Sceleton.dw, Sceleton.dh);
    if (Sounds.gameMainThemeSound.duration <= Sounds.gameMainThemeSound.currentTime) {
      Sounds.gameMainThemeSound.play();
    }
  }
  var loopInterval, sceletonPhysicsInterval, sceletonAnimationInterval, coinAnimationInterval, coinPhysicsInterval, physicsInterval, drawInterval, moveAnimationInterval;

  function start(levelSelect) {
    close();
    Sounds.gameMainThemeSound.play();
    window.addEventListener('keydown', keysPressed);
    window.addEventListener('keyup', keysUp);
    generateLevel(levelMaps[levelSelect]);
    maxLength = [];
    levelMaps[levelSelect].forEach(map => {
      maxLength.push(map.length);
    });
    maxLength = Math.max.apply(null, maxLength);
    score.innerHTML = 'Счет: 0/' + coins.length;
    cvs.style.top = (document.documentElement.clientHeight - levelMaps[levelSelect].length * 50) / 2 + 'px';
    generateBackgrounds(0, levelMaps[levelSelect].length * 50 - 793);
    loopInterval = setInterval(loop, 1);
    coinAnimationInterval = setInterval(coinAnimation, 1000 / 15);
    physicsInterval = setInterval(physics, 1);
    moveAnimationInterval = setInterval(moveAnimation, 1000 / 15);
    drawInterval = setInterval(draw, 1000 / 30);
  }

  function close() {
    Sounds.gameMainThemeSound.currentTime = 0;
    Sounds.gameMainThemeSound.pause();
    Player.score = 0;
    window.removeEventListener('keydown', keysPressed);
    window.removeEventListener('keydown', keysUp);
    floors = [];
    coins = [];
    backgroundLayers = [];
    collisionObjectsList = [];
    intersectionObjects = [];
    charactersList = [];
    collectiblesList = [];
    backgroundsList = []
    clearInterval(loopInterval);
    clearInterval(coinAnimationInterval);
    clearInterval(physicsInterval);
    clearInterval(drawInterval);
    clearInterval(moveAnimationInterval);
  }
  //start();
  window.addEventListener('keydown', function() {
    if (this.event.key === 'Escape') {
      close();
    }
  })
  var levels = document.querySelector('.levels'),
    score = document.querySelector('.score'),
    levelSelect;
  for (var level = 0; level < levelMaps.length; level++) {
    levels.innerHTML += '<div class="level">' + (level + 1) + '</div>';
  }
  levels.addEventListener('click', function(event) {
    console.log(event.target);
    if (event.target.className === 'level') {
      levelSelect = event.target.innerHTML;
    }
  })
  document.querySelector('.start_button').addEventListener('click', function() {
    start(levelSelect - 1);
    fullscreen();
  });
  window.onload = function() {}

  function fullscreen() {
    var el = document.getElementById('canvas');

    if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    } else {
      document.documentElement.mozRequestFullScreen();
    }
  }
}