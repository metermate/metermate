var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var routes = require('./routes/routes.js');

var latestData;

var app = express();
app.use(bodyParser.json({ extend: false }));
app.use(cors());
app.use(express.static('./client'));
app.set('port', process.env.PORT || 1337);

app.use('/api/meters', routes);

app.get('/api/clean-meter-locations', function(req, res) { // Used to remove bad data points
  console.log("Removing bad data points from DB")
  dbConnection.query('DELETE from meters WHERE latitude = 0 AND longitude = 0', function(err, result) {
    if(err) {
      console.error(err);
    }
    console.log("Removed data points at 0, 0: ");
    res.end();
  });
  dbConnection.query('DELETE from meters WHERE latitude = 34.01945 AND longitude = -118.49119', function(err, result) {
    if(err) {
      console.error(err);
    }
    console.log("Removed data points at 34.01945, -118.49119");
    res.end();
  });
});

app.get('/api/store-latest-meter-data', function(req, res) { // Stores current DB into latestData array
  dbConnection.query('SELECT * from meters', function(err, result) {
    if (err) {
      console.error(err);
    }
    latestData = result;
    res.status(200).end();
  });
});

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

/* --------- ON SERVER INITIALIZE --------- */

console.log("Populating DB"); // Populates DB with meter data
http.get({
  host: 'localhost',
  port: 1337,
  path: '/api/meter-locations'
})

setTimeout(function() { // Removes bad data points from DB
  http.get({
    host: 'localhost',
    port: 1337,
    path: '/api/clean-meter-locations'
  })
}, 7000)

setTimeout(function() { // Populates DB with meter events data
  http.get({
    host: 'localhost',
    port: 1337,
    path: '/api/meter-events'
  })
}, 10000)

setTimeout(function(){ // Stores current state of DB into latestData array
  console.log("Storing current DB into latestData array")
  http.get({
    host: 'localhost',
    port: 1337,
    path: '/api/store-latest-meter-data'
  })

}, 240000)

/* --------- METER EVENTS AUTO UPDATE --------- */

setInterval(function(){ // Retrieves meter events and updates DB
  console.log("Retrieving Meter Events Data")
  http.get({
    host: 'localhost',
    port: 1337,
    path: '/api/meter-events'
  })

  /* --------- STORES LATEST DB DATA INTO ARRAY --------- */

  setTimeout(function(){ // Stores current state of DB into latestData array
    console.log("Storing current DB into latestData array")
    http.get({
      host: 'localhost',
      port: 1337,
      path: '/api/store-latest-meter-data'
    })

  }, 240000); // Timer set to 4 minutes to ensure DB is completely updated before storing to array

}, 300000); // Interval set to every 5 minutes

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ', app.get('port'));
});
