// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var pg = require('pg');


// *** routes *** //
var routes = require('./routes/index.js');


// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/', routes);

var connectionString = 'postgres://localhost:5432/puppies';
app.get('/api/puppies/', function(req, res, next) {
  var responseArray = [];
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
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

app.get('/api/puppy/:id', function(req, res, next) {
  var responseArray = [];
  var connectionString = 'postgres://localhost:5432/puppies';
  pg.connect(connectionString, function(err, client, done) {

    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }

    var query = client.query('select * from puppies where id=' + req.params.id);

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

app.post('/api/puppy/new', function(req, res, next) {
  var newPuppy = req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var query = client.query("insert into puppies (name, breed, age_months) values ('" + req.body.name + ", " + req.body.breed + ", " + req.body.age + ")");

    query.on('end', function() {
      res.json({status: 'success', message: 'Inserted new puppy into the pound!'});
      done();
    });
    pg.end();
  });
});

app.delete('/api/puppies/:id', function(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var query = client.query('delete from puppies where id=' + req.params.id);

    query.on('end', function() {
      res.json({status: 'success', message: 'Sent a puppy to the farm upstate!'});
      done();
    });
    pg.end();
  });
});

// curl --data "column=name&value=linus" localhost:5000/api/puppy/id

app.put('/api/puppy/:id', function(req, res, next) {
  var updatePup = req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      return res.status(500).json({status: 'error',message: 'Something didn\'t work'});
    }
    var query = client.query("update puppies set " + updatePup.column + "='" + updatePup.value + "'" + "where id=" + req.params.id);

    query.on('end', function() {
      res.json({status: 'success', message: 'Inserted new puppy into the pound!'});
      done();
    });
    pg.end();
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
