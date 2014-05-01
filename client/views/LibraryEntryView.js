// LibraryEntryView.js - Defines a backbone view class for the entries that will appear within the library views. These will be inserted using the "subview" pattern.
var LibraryEntryView = Backbone.View.extend({

  tagName: 'tr',

  template: _.template('<td class="queuebutton">Que this song!</td><td class="songentry">(<%= artist %>)</td><td class="songentry"><%= title %></td>'),

  events: {
    'click .songentry': function() {
      this.model.play();
      // this.model.enqueue();
    },

    'click .queuebutton': function() {
      // this.model.play();
      this.model.enqueue();
    }

  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
