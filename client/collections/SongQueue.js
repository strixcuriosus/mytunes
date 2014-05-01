// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(params){

    this.on('add', function(){
      if (!params){
        this.playFirst();
      }
    }, this);

    // this.playFirst();
  },

  playFirst: function(){
    if (this.at(0)) {
      this.at(0).play();
    }
  }


});
