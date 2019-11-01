selectedTrack = 1;
var Player = {
  track: ['song.mp3', 'song2.mp3', 'song3.mp3'],
  status: 'pause',
  display: function() {
    return 'Track: ' + this.track[selectedTrack] + ' Status: ' + this.status;
  },
  play: function() {
    this.status = 'play';
  },
  pause: function() {
    this.status = 'pause';
  },
  next: function() {
    // TODO
    selectedTrack = (selectedTrack + 1) % this.track.length;
  },
  prev: function() {
    // TODO
    selectedTrack = (selectedTrack - 1 + this.track.length) % this.track.length;
  }
};