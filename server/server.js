var express = require('express');
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
// model.locations.get();

// Removes erroneous location data from DB
// dbHelpers.cleanLocationData;

// Retrieves meter events and stores in DB
// setTimeout(function() {
//   model.events.get();
// }, 3000);

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ', app.get('port'));
});
