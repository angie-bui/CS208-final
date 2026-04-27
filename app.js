const express = require('express');
const path = require('path');
const { dbMiddleware, createDbConnection } = require('./bin/db');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(dbMiddleware);

// routes
app.use('/', indexRouter);

const db = createDbConnection();

db.query('SELECT COUNT(*) AS count FROM comments', (err, results) => {
  if (err) {
    console.error('Error checking comments table:', err);
    return;
  }

  if (results[0].count === 0) {
    console.log('Seeding initial comments...');

    const seedQuery = `
      INSERT INTO comments (name, message)
      VALUES
      ('Downtown Donuts Team', 'Welcome to our customer comments page!'),
      ('Sam', 'The maple bacon bar is my favorite.');
    `;

    db.query(seedQuery, (err) => {
      if (err) {
        console.error('Error seeding comments:', err);
      } else {
        console.log('Seed data inserted!');
      }
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
