window.onload = function() {
  document.fullscreenEnabled = true;
  var cvs = document.getElementById('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = 928;
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
    drawFloor() {
      ctx.drawImage(this.image, this.dx, this.dy, this.dw, this.dh);
    }
  }
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
    for (var background = 0; background < backgroundLayersSrc.length; background++) {
      backgroundLayers.push(new Background(backgroundLayersSrc[background], x, y, 928, 793));
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
    collectiblesList = [];

  function loop() {
    var maxLength = [];
    levelMaps[levelSelect - 1].forEach(map => {
      maxLength.push(map.length);
    });
    maxLength = Math.max.apply(null, maxLength);
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
    }
    if (Player.dx <= 100 && Player.mapX > 100) {
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
      [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 2, 0, 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 2, 1, 4, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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

  function generateLevel(levelMap) {
    var x = 0;
    var y = 0;
    for (var yCount = 0; yCount < levelMap.length; yCount++) {
      for (var xCount = 0; xCount < levelMap[yCount].length; xCount++) {
        if (levelMap[yCount][xCount] === 1) {
          floors.push(new Floor('img/floor.jpg', x, y, 50, 50))
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
    // if (character.character === 'sceleton') {
    //   if (character.route) { character.dx += 1; }
    //   if (!character.route) { character.dx -= 1; }
    // }
  }

  function intersection(intersectionObjectList) {
    intersectionObjectList.forEach(intersectionObject => {
      intersectionObject.checkHitBox();
      Player.checkHitBox();
      if (intersectionObject.hitBoxH > Player.hitBoxY && intersectionObject.hitBoxY < Player.hitBoxH &&
        intersectionObject.hitBoxW > Player.hitBoxX && intersectionObject.hitBoxX < Player.hitBoxW) {
        if (intersectionObject.character === 'sceleton') {
          start(levelSelect - 1);
        }
        if (intersectionObject.type === 'coin' && intersectionObject.notCollected) {
          intersectionObject.notCollected = false;
          Player.score += 1;
          score.innerHTML = 'Счет: ' + Player.score;
          if (Player.score >= intersectionObjectList.length) {
            Player.score = 0;
            score.innerHTML = 'Счет: ' + 0;
            levelSelect = +levelSelect;
            levelSelect += 1;
            start(levelSelect - 1);
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
  var grav = 1,
    falling = true;



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
    for (var background = 0; background < backgroundLayers.length; background++) {
      backgroundLayers[background].drawFloor();
    }
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
  }
  var loopInterval, sceletonPhysicsInterval, sceletonAnimationInterval, coinAnimationInterval, coinPhysicsInterval, physicsInterval, drawInterval, moveAnimationInterval;

  function start(levelSelect) {
    close();
    score.innerHTML = 'Счет: 0'
    window.addEventListener('keydown', keysPressed);
    window.addEventListener('keyup', keysUp);
    generateLevel(levelMaps[levelSelect]);
    generateBackgrounds(0, levelMaps[levelSelect].length * 50 - 793);
    loopInterval = setInterval(loop, 1);
    sceletonAnimationInterval = setInterval(SceletonAnimation, 1000 / 15);
    coinAnimationInterval = setInterval(coinAnimation, 1000 / 15);
    physicsInterval = setInterval(physics, 1);
    moveAnimationInterval = setInterval(moveAnimation, 1000 / 15);
    drawInterval = setInterval(draw, 1000 / 30);
  }

  function close() {
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
    clearInterval(loopInterval);
    clearInterval(sceletonAnimationInterval);
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
    //fullscreen();
  });
  window.onload = function() {}

  function fullscreen() {
    var el = document.getElementById('canvas');

    if (el.webkitRequestFullScreen) {
      el.webkitRequestFullScreen();
    } else {
      el.mozRequestFullScreen();
    }
  }
}