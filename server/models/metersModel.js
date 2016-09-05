var database = require('../db.js');
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
        console.log('Retrieved meter locations from API and stored in DB');
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};
