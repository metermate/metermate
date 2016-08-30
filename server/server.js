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
    dbConnection.query('CREATE TABLE IF NOT EXISTS meters (meter_id varchar(100), latitude varchar(100), longitude varchar(100), active varchar(100), area varchar(100), street_address varchar(100), event_type varchar(25), event_time varchar(100))', function(err, result){
      if (err) {
        console.log('Error creating the table: Meters', err);
      } else {
        console.log('Table: Meters created successfully!');
      }
    })
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

app.get('/api/meter-events', function(req, res) {
  var currDate = new Date();
  currDate.setHours(currDate.getHours() - 2.5);
  currDate.toISOString();
  currDate = JSON.stringify(currDate);
  var parsedDate = currDate.replace(/[-:.]/g, "");
  var finalDate = parsedDate.substr(1, 15).concat('Z');

  var url = 'https://parking.api.smgov.net/meters/events/since/' + finalDate;

  request.get(url, function(error, response, body) {
    body = JSON.parse(body);
    if (error) {
      res.status(400).send(error);
    }
    for (var i = 0; i < body.length; i++) {
      dbConnection.query('UPDATE meters SET event_type = ?, event_time = ? WHERE meter_id = ?', [body[i].event_type, body[i].event_time, body[i].meter_id], function(err, result) {
        if (err) {
          console.error(err);
        }
      });
    }
    res.status(200).json(body);
  })
});

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ', app.get('port'));
});
