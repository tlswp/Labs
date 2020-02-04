const Player = require('./Player.js');
const assert = require('assert');
var player = new Player();
describe('Проверка player:', function() {
  it('Play работает', function() {
    assert.equal(player.status, 'pause');
    player.play();
    assert.equal(player.status, 'play');
  });
  it('Pause работает', function() {
    player.status = 'play';
    player.pause();
    assert.equal(player.status, 'pause');
  });
  it('Next работает', function() {
    player = new Player();
    player.next();
    assert.equal(player.selectedTrack, 1);
    player.next();
    player.next();
    assert.equal(player.selectedTrack, 0);
  });
  it('После Next, status остается прежним', function() {
    player = new Player();
    player.play();
    player.next();
    assert.equal(player.status, 'play');
    player.pause();
    player.next();
    assert.equal(player.status, 'pause');
  });
  it('Prev работает', function() {
    player = new Player();
    player.prev();
    assert.equal(player.selectedTrack, 2);
    player.prev();
    assert.equal(player.selectedTrack, 1);
  });
  it('После Prev, status остается прежним', function() {
    player = new Player();
    player.play();
    player.prev();
    assert.equal(player.status, 'play');
    player.pause();
    player.prev();
    assert.equal(player.status, 'pause');
  });
  it('Display работает', function() {
    player = new Player();
    player.play();
    assert.equal(player.display(), 'Track: song.mp3 Status: play');
    player.next();
    player.pause();
    assert.equal(player.display(), 'Track: song2.mp3 Status: pause')
    player.track = []
    player.pause();
    assert.equal(player.display(), 'No tracks found')
  });
  it('Prev не работает если массив с треками пуст', function() {
    player.track = []
    assert.equal(player.prev(), false);
  });
  it('Next не работает если массив с треками пуст', function() {
    player.track = []
    assert.equal(player.next(), false);
  });
  it('Play не работает если массив с треками пуст', function() {
    player.track = []
    assert.equal(player.play(), false);
  });
});