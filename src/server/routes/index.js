var express = require('express');
var router = express.Router();
var connectionString = 'postgres://localhost:5432/puppies';

app.get('/api/puppies', function(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      res.send('Error fetching Client: ' + err);
      done();
    }

    client.query('select * from puppies', function(err, result) {
      return result;
    });

  });
});

function getAllPuppies(client) {
  return client.query('select * from puppies', function(err, result) {
    return result;
  });
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
