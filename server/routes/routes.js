var router = require('express').Router();
var controller = require('../controllers/metersController.js');

// Retrieves meter locations from API and stores in DB
router.get('/locations', controller.locations.get);

// Retrieves meter events from API and stores in DB
router.get('/events', controller.events.get);

// Retrieves latest data in DB for meters in viewport only
router.get('/latest-data', controller.latestData.get);

module.exports = router;
