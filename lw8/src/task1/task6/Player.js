 Player = {
   track: ['song.mp3', 'song2.mp3', 'song3.mp3'],
   status: 'pause',
   selectedTrack: 0,
   display: function() {
     if (this.track.length > 0) {
       return 'Track: ' + this.track[this.selectedTrack] + ' Status: ' + this.status;
     } else {
       this.selectedTrack = 0;
       return 'No tracks found';
     }
   },
   play: function() {
     if (this.track.length > 0) {
       this.status = 'play';
     } else { return false }
   },
   pause: function() {
     this.status = 'pause';
   },
   next: function() {
     if (this.track.length > 0) {
       this.selectedTrack = (this.selectedTrack + 1) % this.track.length;
     } else { return false }
   },
   prev: function() {
     if (this.track.length > 0) {
       this.selectedTrack = (this.selectedTrack - 1 + this.track.length) % this.track.length;
     } else { return false }
   }
 };
 module.exports = Player;