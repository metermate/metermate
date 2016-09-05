var model = require('../models/metersModel.js');

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
