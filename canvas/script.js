function physics() {
  if (jumpPressed) {
    Player.gravitationCount = 0;
  }
  if (!jumpPressed) {
    Player.gravitationCount = 1;
  }
  charactersList.forEach(character => {
    character.checkHitBox();
    collisionObjects.forEach(collisionObjectArray => {
      collisionObjectArray.forEach(collisionObject => {
        if ((collisionObject.dy + collisionObject.dh) - (character.hitBoxY) === 0 &&
          ((collisionObject.dx <= character.hitBoxW && character.hitBoxW < collisionObject.dx + collisionObject.dw) ||
            (collisionObject.dx + collisionObject.dw >= character.hitBoxX && collisionObject.dx <= character.hitBoxW))) {
          character.dy += 1;
        }
        if (collisionObject.dy - (character.hitBoxH) === 0 &&
          ((collisionObject.dx <= character.hitBoxW && character.hitBoxW < collisionObject.dx + collisionObject.dw) ||
            (collisionObject.dx + collisionObject.dw >= character.hitBoxX && collisionObject.dx <= character.hitBoxW))) {
          character.gravitationCount = 0;
          if (!jumpPressed) {
            jumpCount = 0;
          }
        }
        if (character.hitBoxH > collisionObject.dy && character.hitBoxY < collisionObject.dy + collisionObject.dh &&
          character.hitBoxW === collisionObject.dx) {
          character.dx -= 1;
          character.mapX -= 1;
        }
        if (character.hitBoxH > collisionObject.dy && character.hitBoxY < collisionObject.dy + collisionObject.dh &&
          character.hitBoxX === collisionObject.dx + collisionObject.dw) {
          character.dx += 1;
          character.mapX += 1;
        }
      });
    });
  });
  character.dy += character.gravitationCount;
}
window.addEventListener('keydown', keysPressed);
window.addEventListener('keyup', keysUp);