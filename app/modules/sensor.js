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
      this.update();
    },

    update : function() {
      var dataPoints = this.options.dataPoints || 10;
      var sparklineData = this.model.get('data').slice(0, dataPoints);
      console.log(sparklineData);
      this.$el.sparkline( sparklineData, {
        valueSpots : { '0:9' : 'blue' }
      } );
    },

    render : function() {
      return this;
    }
  });

  // Return the module for AMD compliance.
  return Sensor;

});
