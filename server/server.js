var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'meterDB'
});

var app = express();
app.use(bodyParser.json({ extend: false }));
app.use(cors());
app.use(express.static('./client'));
app.set('port', process.env.PORT || 1337);

dbConnection.connect(function(err) {
  if (!err) {
    console.log('Database is connected...');
  } else {
    console.log('Error connecting to database...');
  }
});

app.get('/api/meter-locations', function(req, res) {
  var url = 'https://parking.api.smgov.net/meters/';

  request.get(url, function(error, response, body) {
    dbConnection.query('TRUNCATE meters');
    if (error) {
      res.status(400).send(error);
    }
    body = JSON.parse(body);

    for (var i = 0; i < body.length; i++) {
      dbConnection.query('INSERT INTO meters (meter_id, latitude, longitude, active, area, street_address) VALUES (?,?,?,?,?,?)', [body[i].meter_id, body[i].latitude, body[i].longitude, body[i].active, body[i].area, body[i].street_address], function(err, result) {
        if (err) {
          console.error(err);
        }
      });
    }
    res.status(200).json(body);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ', app.get('port'));
});
