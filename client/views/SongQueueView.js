// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  initialize: function() {
    this.render();
    this.collection.on(
      {
        'add': function(){
          console.log('queue collection changed');
          this.render();
        },

        'remove': function(){
          this.render();
        },

        'ended': function(){
          this.render();
        }
      } ,this );
  },

  render: function() {
    this.$el.children().detach();

    this.$el.html('<th>Playlist</th>').append(
           this.collection.map(function(song){
            return new SongQueueEntryView({model: song}).render();
      })
    );

    return this.$el;
  }

});
