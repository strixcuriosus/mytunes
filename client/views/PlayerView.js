// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay /><div></div>',

  initialize: function() {
  },

  events: {
    'ended': function(){
      this.model.ended();
      console.log('playerview says: Song ended!');
    }
  },

  setSong: function(song){
    this.model = song;
    this.render();
    initOnce();
  },

  render: function(){
    // this.$el.html(this.el);

    this.$el.attr('src', this.model ? this.model.get('url') : '');
    this.$el.next('div').text('Now playing: ' + this.model.get('title') );
    return this.$el;
  }

});
