// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.collection.on('change', function(){
      console.log('queue collection changed');
      this.render();
    },this );
  },

  render: function() {
    this.$el.children().detach();

    return this.$el.html('<th>Playlist</th>').append(
           this.collection.map(function(song){
            return new SongQueueEntryView({model: song}).render();
      })
    );

    // return this.$el;
  }

});
