var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var routes = require('./routes/routes.js');
var dbHelpers = require('./helpers/dbHelpers.js');

var app = express();
app.use(bodyParser.json({ extend: false }));
app.use(cors());
app.use(express.static('./client'));
app.set('port', process.env.PORT || 1337);

app.use('/api/meters', routes);

app.get('/api/get-meter-data', function(req, res) {
  var testArr = [];
  for(var i = 0; i < latestData.length; i++) {
    if(latestData[i].latitude <= Number(req.query.neLat) && latestData[i].latitude >= Number(req.query.swLat) && latestData[i].longitude <= Number(req.query.neLng) && latestData[i].longitude >= Number(req.query.swLng)) {
      testArr.push(latestData[i]);
    }
  }
  console.log("Number of meters in viewport: " + testArr.length);
  res.send(testArr);
});

/* --------- RETRIEVES METER DATA ON INITIALIZATION --------- */

// Retrieves meter locations and stores in DB as soon as server initializes
http.get({
  host: 'localhost',
  port: 1337,
  path: '/api/meters/locations'
});

// Removes erroneous location data from DB
setTimeout(dbHelpers.cleanLocationData, 5000);

// Retrieves meter events and stores in DB
setTimeout(function() {
  http.get({
    host: 'localhost',
    port: 1337,
    path: '/api/meters/events'
  });
}, 10000);

// Stores latest meter data DB in local storage
setTimeout(dbHelpers.storeLatestData, 120000);

/* --------- METER EVENTS AUTO UPDATE --------- */

// Retrieves meter events and updates data in DB every 5 minutes
setInterval(function() {
  console.log('AUTO UPDATE: Retrieving latest meter events from API...');
  http.get({
    host: 'localhost',
    port: 1337,
    path: '/api/meters/events'
  });
}, 300000);

// After the DB is updated, the local storage is also updated 10 seconds later
setInterval(dbHelpers.storeLatestData, 310000);

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ', app.get('port'));
});
