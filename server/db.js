var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'mysql.kanadachi.com',
  user: 'css_s',
  password: 'kimchiboyz',
  database: 'metermate'
  // host: 'localhost',
  // user: 'root',
  // database: 'meterDB'
});

db.connect(function(err) {
  if (err) {
    console.error('Error connecting to database: ', err);
  } else {
    console.log('Successfully connected to database');
    db.query('CREATE TABLE IF NOT EXISTS meters (meter_id varchar(100), latitude varchar(100), longitude varchar(100), active varchar(100), area varchar(100), street_address varchar(100), event_type varchar(25), event_time varchar(100))', function(err, result){
      if (err) {
        console.log('Error creating table in database: ', err);
      }
    });
  }
});

exports.db = db;
