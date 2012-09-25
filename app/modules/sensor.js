define([
  // Application.
  "app",
  "plugins/jquery.sparklines"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Sensor = app.module();

  // Default model.
  Sensor.Model = Backbone.Model.extend({
    defaults : {
      name : 'Unnamed sensor',
      data : []
    },

    add : function( dataPoint ) {
      this.set(
        'data',
        [].prototype.push.apply( this.get( 'data' ), dataPoint )
      );
    }
  });

  Sensor.Views.Sensor = Backbone.View.extend({
    tagName : 'li',

    initialize : function() {
      this.model.on( 'change', this.update, this );
      this.update();
    },

    update : function() {
      var dataPoints = this.options.dataPoints || 10;
      this.$el.sparkline( this.get( 'data' ).slice(0, dataPoints) );
    },

    render : function() {
      return this;
    }
  });

  // Return the module for AMD compliance.
  return Sensor;

});
