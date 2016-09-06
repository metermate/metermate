var express = require('express');
var os = require('os');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var model = require('./models/metersModel.js');
var routes = require('./routes/routes.js');
var dbHelpers = require('./helpers/dbHelpers.js');

var app = express();
app.use(bodyParser.json({ extend: false }));
app.use(cors());
app.use(express.static('./client'));
app.set('port', process.env.PORT || 1337);

app.use('/api/meters', routes);

/* --------- RETRIEVES METER DATA ON INITIALIZATION --------- */

// Retrieves meter locations and stores in DB as soon as server initializes
model.locations.get();

// Removes erroneous location data from DB
setTimeout(dbHelpers.cleanLocationData, 5000);

// Retrieves meter events and stores in DB
setTimeout(function() {
  model.events.get();
}, 10000);

// Stores latest meter data DB in local storage
setTimeout(dbHelpers.storeLatestData, 15000);

/* --------- METER EVENTS AUTO UPDATE --------- */

// Retrieves meter events and updates data in DB every 2 minutes
setInterval(function() {
  console.log('AUTO UPDATE: Retrieving latest meter events from API...');
  model.events.get();
}, 120000);

// After the DB is updated, the local storage is also updated 10 seconds later
setInterval(dbHelpers.storeLatestData, 130000);

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ', app.get('port'));
});
