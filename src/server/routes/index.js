var express = require('express');
var router = express.Router();
// var connectionString = 'postgres://localhost:5432/puppies';
// var app = express();
// app.get('/api/puppies/', function(req, res, next) {
//   var responseArray = [];
//   pg.connect(connectionString, function(err, client, done) {
//
//     if(err) {
//       console.log(err);
//       done();
//       return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
//     }
//
//     var query = client.query('select * from puppies');
//
//     query.on('row', function(row) {
//       responseArray.push(row);
//     });
//
//     query.on('end', function() {
//       res.json(responseArray);
//       done();
//     });
//
//      pg.end();
//   });
// });
//
// app.get('/api/puppy/:id', function(req, res, next) {
//   var responseArray = [];
//   pg.connect(connectionString, function(err, client, done) {
//     if(err) {
//       done();
//       return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
//     }
//     var query = client.query('select * from puppies where id=' + req.params.id);
//     query.on('row', function(row) {
//       responseArray.push(row);
//     });
//     query.on('end', function() {
//       res.json(responseArray);
//       done();
//     });
//     pg.end();
//   });
// });

// app.post('/api/puppy/new', function(req, res, next) {
//   var newPuppy = req.body
//   pg.connect(connectionString, function(err, client, done) {
//     if(err) {
//       done();
//       return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
//     }
//     var query = client.query('insert into puppies (blah, blah, blah) values (blah, blah, blah));
//
//     query.on('end', function() {
//       res.json({status: 'success', message: 'Inserted new puppy into the pound!'});
//       done();
//     });
//     pg.end();
//   });
// });

// app.post('/api/puppies/:id', function(req, res, next) {
//   var newPuppy = req.body
//   pg.connect(connectionString, function(err, client, done) {
//     if(err) {
//       done();
//       return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
//     }
//     var query = client.query('delete from puppies where id=' + req.params.id);
//
//     query.on('end', function() {
//       res.json({status: 'success', message: 'Sent a puppy to the farm upstate!'});
//       done();
//     });
//     pg.end();
//   });
// });


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
