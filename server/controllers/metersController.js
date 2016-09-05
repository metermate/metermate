var model = require('../models/metersModel.js');
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
  model.events.get()
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
  var meterData = [];
  for (var i = 0; i < dbHelpers.latestData.length; i++) {
    if(dbHelpers.latestData[i].latitude <= Number(req.query.neLat) &&
       dbHelpers.latestData[i].latitude >= Number(req.query.swLat) &&
       dbHelpers.latestData[i].longitude <= Number(req.query.neLng) &&
       dbHelpers.latestData[i].longitude >= Number(req.query.swLng)) {

      meterData.push(dbHelpers.latestData[i]);
    }
  }
  console.log('Number of meters in viewport: ', meterData.length);
  res.send(meterData);
};
