// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(params){

    this.on('add', function(){
      if (!params){
        this.playFirst();
      }
    }, this);

    this.on('ended', function(){
      this.remove(this.at(0));
      if (this.at(0)) {
        this.playFirst();
      }
    }, this);

    this.on('enqueueSong', function(song) {
      debugger;
      this.add(song);
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
