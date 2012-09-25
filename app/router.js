define([
  "app",
  "modules/sensor"
], function(app, Sensor) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      var sensorModels = {};

      var socket = io.connect('http://localhost:3000');

      socket.on('sensordata', handleData);

      function handleData(data) {
        for (var sensor in data) {
          if ( sensorModels[sensor] ) {
            sensorModels[ sensor ].add( data[ sensor ] );
            return;
          }

          var s = sensorModels[ sensor ] = new Sensor.Model({
            name : sensor,
            data : [ data[ sensor ] ]
          });

          var view = new Sensor.Views.Sensor({ model : s }).render();
          view.$el.appendTo( '#sensors' );
        }
      }

      console.log('got here', Sensor);

    }
  });

  return Router;

});
