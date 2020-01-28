const Player = require('./Player.js');
const assert = require('assert');

describe('Проверка Player:', function() {
  it('Play работает', function() {
    Player.play();
    assert.equal(Player.status, 'play');
  });
  it('Pause работает', function() {
    Player.pause();
    assert.equal(Player.status, 'pause');
  });
  it('Next работает', function() {
    Player.track = ['song.mp3', 'song2.mp3', 'song3.mp3']
    Player.selectedTrack = 0;
    Player.next();
    assert.equal(Player.selectedTrack, 1);
    Player.selectedTrack = 2;
    Player.next();
    assert.equal(Player.selectedTrack, 0);
  });
  it('После Next, status остается прежним', function() {
    Player.play();
    Player.track = ['song.mp3', 'song2.mp3', 'song3.mp3']
    Player.selectedTrack = 0;
    Player.next();
    assert.equal(Player.status, 'play');
    Player.pause();
    Player.selectedTrack = 2;
    Player.next();
    assert.equal(Player.status, 'pause');
  });
  it('Prev работает', function() {
    Player.track = ['song.mp3', 'song2.mp3', 'song3.mp3']
    Player.selectedTrack = 0;
    Player.prev();
    assert.equal(Player.selectedTrack, 2);
    Player.selectedTrack = 2;
    Player.prev();
    assert.equal(Player.selectedTrack, 1);
  });
  it('После Prev, status остается прежним', function() {
    Player.play();
    Player.track = ['song.mp3', 'song2.mp3', 'song3.mp3']
    Player.selectedTrack = 0;
    Player.prev();
    assert.equal(Player.status, 'play');
    Player.pause();
    Player.selectedTrack = 2;
    Player.prev();
    assert.equal(Player.status, 'pause');
  });
  it('Display работает', function() {
    Player.track = ['song.mp3', 'song2.mp3', 'song3.mp3']
    Player.selectedTrack = 0;
    Player.play();
    assert.equal(Player.display(), 'Track: song.mp3 Status: play');
    Player.track = ['song.mp3', 'song2.mp3', 'song3.mp3']
    Player.selectedTrack = 1;
    Player.pause();
    assert.equal(Player.display(), 'Track: song2.mp3 Status: pause')
    Player.track = []
    Player.selectedTrack = 1;
    Player.pause();
    assert.equal(Player.display(), 'No tracks found')
  });
  it('Prev не работает если массив с треками пуст', function() {
    Player.track = []
    assert.equal(Player.prev(), false);
  });
  it('Next не работает если массив с треками пуст', function() {
    Player.track = []
    assert.equal(Player.next(), false);
  });
  it('Play не работает если массив с треками пуст', function() {
    Player.track = []
    assert.equal(Player.play(), false);
  });
});