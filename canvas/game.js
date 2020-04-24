var rows = document.querySelector('.rows'),
  columns = document.querySelector('.columns'),
  gen = document.querySelector('.gen'),
  grid = document.querySelector('.grid'),
  genM = document.querySelector('.genM'),
  column = 0,
  row = 0,
  type = 'block',
  types = document.querySelector('.types');

types.addEventListener('click', function() {
  if (event.target.tagName === 'BUTTON') {
    type = event.target.getAttribute('data-type');
  }
});
gen.addEventListener('click', function() {
  column = columns.value;
  row = rows.value;
  grid.style.width = columns.value * 20 + 'px';
  // grid.style.height = rows.value * 20 + 'px';
  grid.style.gridTemplateColumns = `repeat(${columns.value},1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows.value},1fr)`;
  grid.innerHTML = '';
  var count = 0,
    inputs = '';
  while (count < columns.value * rows.value) {
    inputs += '<div class="block"></div>';
    count += 1;
  }
  grid.innerHTML = inputs;
  var blocks = document.querySelectorAll('.block');
  for (var y = 0; y < row; y++) {
    for (var x = 0; x < column; x++) {
      if (y === 0) {
        blocks[x].classList.add('floor');
        blocks[x].style.backgroundImage = 'url(img/floor_icon.png)';
        blocks[column * (row - 2) + x].style.backgroundImage = 'url(img/floor_icon.png)';
        blocks[column * (row - 2) + x].classList.add('floor');
        blocks[column * (row - 1) + x].style.backgroundImage = 'url(img/floor_icon.png)';
        blocks[column * (row - 1) + x].classList.add('floor');
      }
    }
    blocks[column * (y)].style.backgroundImage = 'url(img/floor_icon.png)';
    blocks[column * (y)].classList.add('floor');
    blocks[(y + 1) * column - 1].classList.add('floor');
    blocks[(y + 1) * column - 1].style.backgroundImage = 'url(img/floor_icon.png)';
  }
});
var mouseDownStatus = false;
grid.addEventListener('mousedown', function(event) {
  if (event.button === 0) { mouseDownStatus = true; }
});
window.addEventListener('mouseup', function() {
  if (event.button === 0) { mouseDownStatus = false; }
});

grid.addEventListener('mousemove', function(event) {
  if (mouseDownStatus) {
    if (event.target.classList.contains('block')) {
      if (type === 'block' && !event.target.classList.contains('floor')) {
        event.target.classList.add('floor');
      }
      if (type === 'block_bg' && !event.target.classList.contains('floor_bg')) {
        event.target.classList.add('floor_bg');
      }
      if (type === 'player' && !event.target.classList.contains('player')) {
        event.target.classList.add('player');
      }
      if (type === 'skeleton' && !event.target.classList.contains('skeleton')) {
        event.target.classList.add('skeleton');
      }
      if (type === 'coin' && !event.target.classList.contains('coin')) {
        event.target.classList.add('coin');
      }
      if (type === 'spikes' && !event.target.classList.contains('spikes')) {
        event.target.classList.add('spikes');
      }
      if (type === 'eraser') {
        event.target.style.backgroundImage = '';
        event.target.className = 'block';
      }
      event.target.innerHTML = '';
      if (event.target.classList.length > 2) {
        if (event.target.classList.contains('floor_bg')) {
          event.target.innerHTML += '<div style="background-image:url(img/floor_bg_icon.png)"></div>';
        }
        if (event.target.classList.contains('floor')) {
          event.target.innerHTML += '<div style="background-image:url(img/floor_icon.png)"></div>';
        }
        if (event.target.classList.contains('player')) {
          event.target.innerHTML += '<div style="background-image:url(img/player_icon.png)"></div>';
        }
        if (event.target.classList.contains('skeleton')) {
          event.target.innerHTML += '<div style="background-image:url(img/skeleton_icon.png)"></div>';
        }
        if (event.target.classList.contains('coin')) {
          event.target.innerHTML += '<div style="background-image:url(img/coin_icon.png)"></div>';
        }
        if (event.target.classList.contains('spikes')) {
          event.target.innerHTML += '<div style="background-image:url(img/spikes_icon.png)"></div>';
        }
      } else {
        if (event.target.classList.contains('floor')) {
          event.target.style.backgroundImage = 'url(img/floor_icon.png)';
        }
        if (event.target.classList.contains('floor_bg')) {
          event.target.style.backgroundImage = 'url(img/floor_bg_icon.png)';
        }
        if (event.target.classList.contains('player')) {
          event.target.style.backgroundImage = 'url(img/player_icon.png)';
        }
        if (event.target.classList.contains('skeleton')) {
          event.target.style.backgroundImage = 'url(img/skeleton_icon.png)';
        }
        if (event.target.classList.contains('coin')) {
          event.target.style.backgroundImage = 'url(img/coin_icon.png)';
        }
        if (event.target.classList.contains('spikes')) {
          event.target.style.backgroundImage = 'url(img/spikes_icon.png)';
        }
      }
    }
  }
});
genM.addEventListener('click', function() {
  var block = document.querySelectorAll('.block'),
    count = 0,
    matrixFile = '[';
  var matrix = [];
  for (var y = 0; y < row; y++) {
    matrix[y] = [];
    matrixFile += '[';
    for (var x = 0; x < column; x++) {
      matrix[y][x] = 0;
      if (block[count].classList.length > 2) {
        matrix[y][x] = [];
        matrixFile += '[';
        block[count].classList.forEach(className => {
          if (className === 'floor') {
            matrix[y][x].push(1);
          }
          if (className === 'floor_bg') {
            matrix[y][x].push(5);
          }
          if (className === 'player') {
            matrix[y][x].push(2);
          }
          if (className === 'coin') {
            matrix[y][x].push(3);
          }
          if (className === 'skeleton') {
            matrix[y][x].push(4);
          }
          if (className === 'spikes') {
            matrix[y][x].push(6);
          }
        });
        var elementCount = 0;
        matrix[y][x].forEach(element => {
          if (elementCount === 0) {
            matrixFile += element;
          } else {
            matrixFile += ',' + element;
          }
          elementCount += 1;
        })
        if (x < column - 1) {
          matrixFile += '],';
        } else {
          matrixFile += ']';
        }
      } else {
        if (block[count].classList.contains('floor')) {
          matrix[y][x] = 1;
        }
        if (block[count].classList.contains('floor_bg')) {
          matrix[y][x] = 5;
        }
        if (block[count].classList.contains('player')) {
          matrix[y][x] = 2;
        }
        if (block[count].classList.contains('coin')) {
          matrix[y][x] = 3;
        }
        if (block[count].classList.contains('skeleton')) {
          matrix[y][x] = 4;
        }
        if (block[count].classList.contains('spikes')) {
          matrix[y][x] = 6;
        }
        if (x < column - 1) {
          matrixFile += matrix[y][x] + ',';
        } else {
          matrixFile += matrix[y][x];
        }
      }
      count += 1;
    }
    if (y < row - 1) {
      matrixFile += '],';
    } else {
      matrixFile += ']';
    }

  }
  matrixFile += ']';

  function saveData(data, fileName) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blob = new Blob([data], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    return window.URL.revokeObjectURL(url);
  }
  console.log(matrixFile);
  var data = matrixFile,
    fileName = 'miner.json';

  saveData(data, fileName);
  levelMaps.push(matrix);
  levels.innerHTML = '';
  for (var level = 0; level < levelMaps.length; level++) {
    levels.innerHTML += '<div class="level">' + (level + 1) + '</div>';
  }
});
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
  while (maxLength * 25 / 928 > count || !backgroundAdded) {
    backgroundAdded = true;
    var backgroundLayers = [];
    for (var background = 0; background < backgroundLayersSrc.length; background++) {
      backgroundLayers.push(new Background(backgroundLayersSrc[background], 928 * count, levelMaps[levelSelect - 1].length * 25 - 793, 928, 793));
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
var Skeleton;
class CollisionObject {
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
  draw() {
    ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
  }
}
backgroundObject = [];
class BackgroundObject {
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
  draw() {
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
  draw() {
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
// || (Player.dx + maxLength * 25 - Player.mapX >= cvs.width)
function loop() {
  if ((Player.dx >= cvs.width / 2 && maxLength * 25 - Player.mapX >= cvs.width / 2)) {
    backgroundObjectsList.forEach(backgroundObject => {
      backgroundObject.dx -= 1;
    })
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
  } else if ((Player.dx + Player.dw >= cvs.width)) {
    backgroundObjectsList.forEach(backgroundObject => {
      backgroundObject.dx -= 1;
    })
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
  if (Player.dx <= (cvs.width / 2) - 3 && Player.mapX > cvs.width / 2) {
    backgroundObjectsList.forEach(backgroundObject => {
      backgroundObject.dx += 1;
    })
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
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 5, 5, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 0, 0, 4, 0, 0, 5, 5, 1, 1],
    [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, [1, 5], 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, [1, 5], 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 1, 1],
    [1, 1, 1, [1, 5], 5, 5, 5, 5, 5, 5, [1, 5], 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 1, [1, 5], 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1],
    [1, 1, 5, 5, 5, 5, 5, [5, 4], 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 5, 5, [5, 3], 5, 5, [5, 3], 5, 5, [5, 3], 5, 5, [5, 3], 5, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, [1, 5], 5, 5, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, [1, 5],
      [1, 5], 5, 5, 0, 5, [1, 5], 1
    ],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 1],
    [1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 5, 5, 5, 0, 1, 1, 1, 0, 0, 5, 5, 5, 5, 0, 1, 1, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 5, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 1, 1],
    [1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 5, 1],
    [1, 5, 5, 5, [5, 4], 5, 5, 5, 1, 1, 1, 1, 1, 1, 4, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, [5, 4], 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 3, 0, 0, 0, 0, 5, 5, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 5, 5, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 3, [5, 3],
      [5, 3], 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    [1, 1, 1, 5, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1],
    [1, 1, 5, 0, 0, 0, 5, 5, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1],
    [1, 5, 5, 0, 0, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 5, 5, 0, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, [5, 1], 5, 5, 5, [5, 4], 5, 5, 5, 5, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 1],
    [1, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 5, 5, 5, [5, 3],
      [5, 3], 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1
    ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 5, [1, 5], 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 5, 5, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5, 5, 5, 5, 5, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, [5, 3],
      [5, 3],
      [5, 3], 5, 5, 1
    ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, [6, 5],
      [6, 5],
      [6, 5], 1, 1, 1, 1, [6, 5],
      [6, 5],
      [6, 5], 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
    ],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, [1, 5], 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 5, 5, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 5, [1, 5], 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 5, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, [5, 1], 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, [5, 1], 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, [5, 1], 0, 0, 0, 0, 0, 0, 1, 1, 1, [3, 5],
      [3, 5],
      [3, 5], 1, 1
    ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, [5, 1], 0, 0, 0, 0, 5, 5, 0, 0, 0, 5, [5, 4], 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, [5, 1], 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, [5, 1], 0, 0, 0, 0, 0, 4, 0, 1, 1, [3, 5],
      [3, 5],
      [3, 5], 1, 1
    ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, [1, 5], 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 5, 1, 5, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 5, 5, 5, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 0, 5, 0, 0, 0, 0, 1, 5, 5, 1, 5, 5, 1, 5, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 4, 0, 0, 1, [6, 5],
      [6, 5],
      [6, 5],
      [6, 5],
      [6, 5],
      [6, 5],
      [6, 5],
      [6, 5], 1, 0, 0, 0, 3, 3, 3, 0, 0, 1
    ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, [4, 5], 5, 5, 5, 5, 5, [4, 5], 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, [5, 2], 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 1, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, [5, 4], 5, 5, 5, 5, 5, [5, 4], 1, 1, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, [6, 5], 6, 6, 6, 6, 6, 6, [6, 5],
      [6, 5],
      [6, 5], 6, 6, 6, 6, 6, 6, [6, 5], 6, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 4, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1
    ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
    [1, 1, 0, 3, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 1],
    [1, 3, 0, 1, 1, 0, 1, 1, 1, 3, 0, 1, 0, 3, 0, 1],
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
    [1, 0, 0, 3, 0, 0, 0, 3, 0, 1, 0, 3, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 3, 0, 1, 0, 1, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 1, 3, 3, 4, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
]
var levelMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var collisionObjectsList = [];
var spikes = [];
var backgroundObjectsList = [];

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function generateLevel(levelMap) {
  var x = 0;
  var y = 0;
  for (var yCount = 0; yCount < levelMap.length; yCount++) {
    for (var xCount = 0; xCount < levelMap[yCount].length; xCount++) {
      if (typeof levelMap[yCount][xCount] === 'number') {
        if (levelMap[yCount][xCount] === 1) {
          floors.push(new CollisionObject('img/floor.jpg', randomInteger(0, 3) * 512 / 4, randomInteger(0, 3) * 512 / 4, 512 / 4, 512 / 4, x, y, 25, 25))
        }
        if (levelMap[yCount][xCount] === 2) {
          Player.mapX = Math.floor(x + (25 - 64) / 2);
          Player.dx = Math.floor(x + (25 - 64) / 2);
          Player.dy = y - Player.dh;
        }
        if (levelMap[yCount][xCount] === 3) {
          coins.push(new Collectibles('img/coin.png', 0, 0, 16, 16, x + (25 - 16) / 2, y + (25 - 16) / 2, 16, 16, 'coin'));
        }
        if (levelMap[yCount][xCount] === 4) {
          charactersList.push(new Characters('img/skeleton.png', 0, 710, 64, 64, Math.floor(x + (25 - 64) / 2), y - 64, 64, 64, 'skeleton'));
        }
        if (levelMap[yCount][xCount] === 5) {
          backgroundObjectsList.push(new BackgroundObject('img/floor_background.jpg', randomInteger(0, 3) * 512 / 4, randomInteger(0, 3) * 512 / 4, 512 / 4, 512 / 4, x, y, 25, 25));
        }
        if (levelMap[yCount][xCount] === 6) {
          spikes.push(new Collectibles('img/spikes.png', 0, 0, 25, 12, x, y + 25 - 12, 25, 12, 'spikes'));
        }
      }
      if (Array.isArray(levelMap[yCount][xCount])) {
        levelMap[yCount][xCount].forEach(element => {
          if (element === 1) {
            floors.push(new CollisionObject('img/floor.jpg', randomInteger(0, 3) * 512 / 4, randomInteger(0, 3) * 512 / 4, 512 / 4, 512 / 4, x, y, 25, 25))
          }
          if (element === 2) {
            Player.mapX = x;
            Player.dx = x;
            Player.dy = y - Player.dh;
          }
          if (element === 3) {
            coins.push(new Collectibles('img/coin.png', 0, 0, 16, 16, x + (25 - 16) / 2, y + (25 - 16) / 2, 16, 16, 'coin'));
          }
          if (element === 4) {
            charactersList.push(new Characters('img/skeleton.png', 0, 710, 64, 64, Math.floor(x + (25 - 64) / 2), y - 64, 64, 64, 'skeleton'));
          }
          if (element === 5) {
            backgroundObjectsList.push(new BackgroundObject('img/floor_background.jpg', randomInteger(0, 3) * 512 / 4, randomInteger(0, 3) * 512 / 4, 512 / 4, 512 / 4, x, y, 25, 25));
          }
          if (element === 6) {
            spikes.push(new Collectibles('img/spikes.png', 0, 0, 25, 12, x, y + 25 - 12, 25, 12, 'spikes'));
          }
        });
      }
      x += 25;
    }
    y += 25;
    x = 0;
  }
  cvs.height = y;
  collectiblesList.push(coins);
  collectiblesList.push(spikes);
  collisionObjectsList.push(floors);
  charactersList.push(Player);
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
    if (character.character === 'skeleton') {
      if (character.route) {
        character.sy = 710;
        character.frame = character.frame % 8 + 1;
        character.sx = 64 * character.frame;
      }
      if (!character.route) {
        character.sy = 582;
        character.frame = character.frame % 8 + 1;
        character.sx = 64 * character.frame;
      }
    }
  });
}

function SceletonMove() {
  charactersList.forEach(character => {
    if (character.character === 'skeleton') {
      if (character.route) { character.dx += 1; }
      if (!character.route) { character.dx -= 1; }
    }
  });
  // if (character.character === 'skeleton') {
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
      if (intersectionObject.character === 'skeleton') {
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
      if (intersectionObject.type === 'spikes') {
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
          setTimeout(function() {
            var rNum = randomInteger(0, 6),
              winPhrases = ['You win!', 'Congratulation!', 'Success!', 'Awesome!', 'Yeah!', 'Great!', 'Amazing!', 'Fantastic!'];
            ctx.font = '48px Rubik Mono One';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(winPhrases[rNum], cvs.width / 2, cvs.height / 2);
            close();
            Sounds.gameWinSound.play();
            Sounds.gameWinVoices[rNum].play();
          }, 200);
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
var time = 0;

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
          if (character.character === 'skeleton') {
            // console.log((character.hitBoxH > collisionObject.dy && character.hitBoxY < collisionObject.dy + collisionObject.dh &&
            //   character.hitBoxW === collisionObject.dx));
          }
          if (!character.jumpPressed) {
            character.jumpCount = 0;
          }
        }
        if (character.hitBoxH > collisionObject.dy && character.hitBoxY < collisionObject.dy + collisionObject.dh &&
          character.hitBoxW === collisionObject.dx) {
          character.route = false;
          character.dx -= 1;
          character.mapX -= 1;
        }
        if (character.hitBoxH > collisionObject.dy && character.hitBoxY < collisionObject.dy + collisionObject.dh &&
          character.hitBoxX === collisionObject.dx + collisionObject.dw) {
          character.route = true;
          character.dx += 1;
          character.mapX += 1;
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

function timeFormat(time) {
  function place(n) {
    return n < 10 ? '0' + n : n
  }
  var mil, sec, min;
  mil = place(time % 100)
  sec = place(parseInt(time / 100) % 60)
  min = place(parseInt(time / 6000))
  return min + ':' + sec + ':' + mil
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
  backgroundObjectsList.forEach(backgroundObject => {
    backgroundObject.draw();
  });
  collisionObjectsList.forEach(collisionObjects => {
    collisionObjects.forEach(collisionObject => {
      collisionObject.draw();
    });
  });
  collectiblesList.forEach(collectibles => {
    collectibles.forEach(collectible => {
      if (collectible.notCollected) {
        collectible.draw();
      }
    });
  });
  var c = 0;
  charactersList.forEach(character => {
    ctx.drawImage(character.playerImage, character.sx, character.sy, character.sw, character.sh, character.dx, character.dy, character.dw, character.dh);
    // ctx.font = '12px Rubik Mono One';
    // ctx.fillStyle = 'white';
    // c += 20;
    // ctx.fillText(character.mapX + ' ' + character.hitBoxX + ' ' + character.hitBoxY + ' ' + character.hitBoxW + ' ' + character.hitBoxH + ' dx: ' + character.dx + ' dy: ' + character.dy + ' dw: ' + character.dw + ' dh: ' + character.dh + ' ' + character.route, 0, c);
    // ctx.fillStyle = 'white';
    // ctx.fillRect(8, cvs.height - 30, 300, cvs.height - 10);
    // ctx.font = '24px Rubik Mono One';
    // ctx.fillStyle = 'black';
    // ctx.strokeStyle = 'black';
    // c += 20;
    // ctx.fillText('Счет: ' + Player.score + '/' + coins.length, 10, cvs.height - 12);
    //ctx.strokeText('Счет: ' + Player.score + '/' + coins.length, 10, cvs.height - 12);

  });
  if (Sounds.gameMainThemeSound.duration <= Sounds.gameMainThemeSound.currentTime) {
    Sounds.gameMainThemeSound.play();
  }
}
var loopInterval, timerInterval, sceletonAnimationInterval, coinAnimationInterval, coinPhysicsInterval, physicsInterval, drawInterval, moveAnimationInterval;

function start(levelSelect) {
  close();
  document.querySelector('.level_selected').innerHTML = 'Уровень: ' + (levelSelect + 1);
  Sounds.gameMainThemeSound.play();
  window.addEventListener('keydown', keysPressed);
  window.addEventListener('keyup', keysUp);
  generateLevel(levelMaps[levelSelect]);
  charactersList.forEach(character => {
    if (character.character === 'skeleton') {
      character.route = false;
    }
  })
  maxLength = [];
  levelMaps[levelSelect].forEach(map => {
    maxLength.push(map.length);
  });
  maxLength = Math.max.apply(null, maxLength);
  score.innerHTML = 'Счет: 0/' + coins.length;
  cvs.style.top = (document.documentElement.clientHeight - levelMaps[levelSelect].length * 25) / 2 + 'px';
  generateBackgrounds(0, levelMaps[levelSelect].length * 25 - 793);
  timerInterval = setInterval(timer, 10);
  loopInterval = setInterval(loop, 1);
  coinAnimationInterval = setInterval(coinAnimation, 1000 / 15);
  physicsInterval = setInterval(physics, 1);
  moveAnimationInterval = setInterval(moveAnimation, 1000 / 15);
  drawInterval = setInterval(draw, 1000 / 30);
}

function timer() {
  time += 1;
  document.querySelector('.timer').innerHTML = timeFormat(time);
}

function close() {
  time = 0;
  Sounds.gameMainThemeSound.currentTime = 0;
  Sounds.gameMainThemeSound.pause();
  Player.score = 0;
  window.removeEventListener('keydown', keysPressed);
  window.removeEventListener('keydown', keysUp);
  floors = [];
  coins = [];
  spikes = [];
  backgroundLayers = [];
  backgroundObjectsList = [];
  collisionObjectsList = [];
  intersectionObjects = [];
  charactersList = [];
  collectiblesList = [];
  backgroundsList = [];
  clearInterval(timerInterval);
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
  // var el = document.getElementById('canvas');

  // if (el.webkitRequestFullScreen) {
  //   el.webkitRequestFullScreen();
  // } else {
  //   el.mozRequestFullScreen();
  // }
}