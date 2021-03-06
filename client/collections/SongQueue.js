// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(params){

    this.on('add', function(){
      if (!params && this.length === 1){
        // this.playFirst(); // We don't like this 'feature'
      }
    }, this);

    this.on('ended', function(){
      this.remove(this.at(0));
      if (this.at(0)) {
        this.playFirst();
      }
    }, this);

    this.on('dequeue', function(song) {
      this.remove(song);
    }, this);

    this.on('enqueue', function(song) {
      this.add(song);
      console.log('enqueue event heard by SongQueue');
    }, this);

    // this.playFirst();
  },

  playFirst: function(){
    this.at(0).play();
  },

  // remove: function(){
  //   this.remove(this.at(0));
  // }


});
