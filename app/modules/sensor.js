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
    add : function( dataPoint ) {
      var data = this.get( 'data' );
      data.push(dataPoint);
      this.set('data', data);
      this.trigger('change');
    }
  });

  Sensor.Views.Sensor = Backbone.View.extend({
    tagName : 'li',

    initialize : function() {
      this.model.on( 'change', this.update, this );
    },

    update : function() {
      var dataPoints = this.options.dataPoints || 10;
      var sparklineData = this.model.get( 'data' );
      var size = sparklineData.length;
      var start = size - 10 > -1 ? size - 10 : 0;
      var end = size;

      sparklineData = sparklineData.slice( start, end );

      this.$chart.sparkline( sparklineData, {
        valueSpots : { '0:9' : 'blue' }
      } );
    },

    render : function() {
      this.$el.html( this.model.get('name') );
      this.$chart = $('<span>').appendTo( this.$el );
      return this;
    }
  });

  // Return the module for AMD compliance.
  return Sensor;

});
