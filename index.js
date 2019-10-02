var app = require('express')();
var https = require('https');
var fs = require('fs');
var PORT = 443;


// Post request.
var req_res = function (req, res) {
  console.log("[200] " + req.url);
  var fullBody = '';

  // Read post data.
  req.on('data', function (chunk) {
    fullBody += chunk.toString();

    if (fullBody.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      req.connection.destroy();
    }
  });

  // Send response.
  req.on('end', function () {
    // empty 200 OK response for now
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
      'success': true
    }));
  });
};

// Post request to receive notifications.
app.post('/post', req_res);