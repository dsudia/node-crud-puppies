var express = require('express');
var router = express.Router();
var connectionString = 'postgres://localhost:5432/puppies';
var app = express();

app.get('/api/puppies', function(req, res, next) {
  var responseArray = [];
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var query = client.query('select * from puppies');
    query.on('row', function(row) {
      responseArray.push(row);
    });
    query.on('end', function() {
      res.json(responseArray);
      done();
    });
    pg.end();
  });
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
