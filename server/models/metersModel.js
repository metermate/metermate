var database = require('../db.js');
var dbHelpers = require('../helpers/dbHelpers.js');
var request = require('request');

exports.locations = {
  get: getLocations
}

function getLocations() {
  return new Promise(function(resolve, reject) {
    request.get('https://parking.api.smgov.net/meters/', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        database.db.query('TRUNCATE meters');
        for (var i = 0; i < body.length; i++) {
          database.db.query('INSERT INTO meters (meter_id, latitude, longitude, active, area, street_address) VALUES (?,?,?,?,?,?)', [body[i].meter_id, body[i].latitude, body[i].longitude, body[i].active, body[i].area, body[i].street_address], function(err, result) {
            if (err) {
              console.error(err);
            }
          });
        }
        console.log('Retrieving meter locations from API and populating DB...');
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

exports.events = {
  get: getEvents
}

function getEvents(param) {
  var currDate = new Date();
  currDate.setHours(currDate.getHours() - 2);
  currDate.toISOString();
  currDate = JSON.stringify(currDate);

  var parsedDate = currDate.replace(/[-:.]/g, "");
  var finalDate = parsedDate.substr(1, 15).concat('Z');

  var url = 'https://parking.api.smgov.net/meters/events/since/' + finalDate;

  var boundaries = param;
  console.log('param in getEvents model: ', param);

  return new Promise(function(resolve, reject) {
    request.get(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        for (var i = 0; i < body.length; i++) {
          database.db.query('UPDATE meters SET event_type = ?, event_time = ? WHERE meter_id = ? AND latitude <= ? AND latitude >= ? AND longitude <= ? AND longitude >= ?', [body[i].event_type, body[i].event_time, body[i].meter_id, boundaries[0], boundaries[1], boundaries[2], boundaries[3]], function(err, result) {
            if (err) {
              console.error(err);
            }
          });
        }
        console.log('Retrieving latest meter events from API and populating DB...');
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};
