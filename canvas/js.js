function physics() {
  if (jumpPressed) {
    Player.gravitationCount = 0;
  }
  if (!jumpPressed) {
    Player.gravitationCount = 1;
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
      Player.mapX -= 1;
    }
    if (Player.dy + height > floors[floorsElement].dy && Player.dy + y < floors[floorsElement].dy + floors[floorsElement].dh &&
      Player.dx + x === floors[floorsElement].dx + floors[floorsElement].dw) {
      Player.dx += 1;
      Player.mapX += 1;
    }
  }
  Player.dy += Player.gravitationCount;
}