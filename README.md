A simple server for displaying data from an Arduino. Send data like this:

    function sendData() {
      var opts = {
        host: 'localhost',
        path: '/sensors',
        port: 3000,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };

      var req = http.request(opts, function(response) {
        response.on('end', function() {
        });
      });

      req.write(JSON.stringify({ data : {
        accel: accel.raw,
        temp: temp.normalized,
        light: light.normalized,
        prox: prox.normalized
      }}));

      req.end();
    }