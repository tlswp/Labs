const mocha = require('mocha');
const chai = require('chai');
const assert = require('assert');

var Player = {
  track: ['song.mp3', 'song2.mp3', 'song3.mp3'],
  status: 'pause',
  selectedTrack: 0,
  display: function() {
    if (this.track.length > 0) {
      return 'Track: ' + this.track[this.selectedTrack] + ' Status: ' + this.status;
    } else {
      this.selectedTrack: 0
      return 'No tracks found';
    }
  },
  play: function() {
    this.status = 'play';
  },
  pause: function() {
    this.status = 'pause';
  },
  next: function() {
    if (this.track.length > 0) {
      this.selectedTrack = (this.selectedTrack + 1) % this.track.length;
    }
  },
  prev: function() {
    if (this.track.length > 0) {
      this.selectedTrack = (this.selectedTrack - 1 + this.track.length) % this.track.length;
    }
  }
};
describe("Проверка:", function() {
  it("Возвращает ожидаемый результат", function() {
    assert.equal(check([], 'number'), false);
    assert.equal(check([], 'null'), false);
    assert.equal(check([], 'array'), true);
    assert.equal(check(null, 'null'), true);
    assert.equal(check('test', 'string'), true);
    assert.equal(check(), false);
  });
});