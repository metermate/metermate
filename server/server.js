var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json({ extend: false }));
app.use(cors());
app.use(express.static('./client'));
app.set('port', process.env.PORT || 1337);

app.get('/', function(req, res) {
  res.send('Hello World!');
})

app.listen(app.get('port'), function() {
  console.log('Server listening on port: ', app.get('port'));
});
