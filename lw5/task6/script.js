var Player = {
  track: ['song.mp3', 'song2.mp3', 'song3.mp3'],
  status: 'pause',
  selectedTrack: 0,
  display: function() {
    if (this.track.length > 0) {
      return 'Track: ' + this.track[this.selectedTrack] + ' Status: ' + this.status;
    } else {
      return 'No tracks found'
    }
  },
  play: function() {
    this.status = 'play';
  },
  pause: function() {
    this.status = 'pause';
  },
  next: function() {
    this.selectedTrack = (this.selectedTrack + 1) % this.track.length;
  },
  prev: function() {
    this.selectedTrack = (this.selectedTrack - 1 + this.track.length) % this.track.length;
  }
};