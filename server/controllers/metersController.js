var model = require('../models/metersModel.js');
var database = require('../db.js');
var dbHelpers = require('../helpers/dbHelpers.js');

exports.locations = {
  get: getLocations
}

function getLocations(req, res) {
  model.locations.get()
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(error) {
      res.status(404).send(error);
    });
};

exports.events = {
  get: getEvents
}

function getEvents(req, res) {
  var boundaries = [Number(req.query.neLat), Number(req.query.swLat), Number(req.query.neLng), Number(req.query.swLng)];
  console.log('boundaries in getEvents controller: ', boundaries);
  model.events.get(boundaries)
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(error) {
      res.status(404).send(error);
    });
};

exports.latestData = {
  get: getLatestData
}

function getLatestData(req, res) {
  var boundaries = [Number(req.query.neLat), Number(req.query.swLat), Number(req.query.neLng), Number(req.query.swLng)];

  database.db.query('SELECT * FROM meters WHERE event_type IN ("SS", "SE") AND latitude <= ? AND latitude >= ? AND longitude <= ? AND longitude >= ?', boundaries, function(err, data) {
    if (err) {
      console.error('Error retrieving data from meterDB: ', err);
    } else {
      console.log('Successfully retrieved data from meterDB');
      res.json(data);
    }
  });
};
