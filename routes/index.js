var express = require('express');
var router = express.Router();

/* Landing page */
router.get('/', function(req, res) {
  res.render('index', { title: 'Downtown Donuts' });
});

/* Menu page */
router.get('/menu', function(req, res) {
  res.render('menu', { title: 'Menu' });
});

/* About page */
router.get('/about', function(req, res) {
  res.render('about', { title: 'About Us' });
});

/* Comments page */
router.get('/comments', function(req, res) {
  const db = req.db;

  db.query('SELECT * FROM comments ORDER BY created_at DESC', (err, comments) => {
    if (err) {
      console.error('Error loading comments:', err);

      return res.render('comments', {
        title: 'Customer Comments',
        comments: [],
        error: 'Comments are unavailable right now. Please try again later.'
      });
    }

    res.render('comments', {
      title: 'Customer Comments',
      comments: comments,
      error: null
    });
  });
});

/* Save new comment */
router.post('/comments', function(req, res) {
  const db = req.db;

  let name = req.body.name;
  let message = req.body.message;

  // Trim whitespace
  name = name ? name.trim() : '';
  message = message ? message.trim() : '';

  // Validation: empty fields
  if (!name || !message) {
    return db.query('SELECT * FROM comments ORDER BY created_at DESC', (err, comments) => {
      return res.render('comments', {
        title: 'Customer Comments',
        comments: comments || [],
        error: 'Name and comment cannot be empty.'
      });
    });
  }

  // Validation: max length
  if (name.length > 80 || message.length > 500) {
    return db.query('SELECT * FROM comments ORDER BY created_at DESC', (err, comments) => {
      return res.render('comments', {
        title: 'Customer Comments',
        comments: comments || [],
        error: 'Input is too long.'
      });
    });
  }

  // Basic sanitization
  name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const sql = 'INSERT INTO comments (name, message) VALUES (?, ?)';

  db.query(sql, [name, message], (err) => {
    if (err) {
      console.error('Error saving comment:', err);

      return db.query('SELECT * FROM comments ORDER BY created_at DESC', (err2, comments) => {
        return res.render('comments', {
          title: 'Customer Comments',
          comments: comments || [],
          error: 'Something went wrong. Please try again.'
        });
      });
    }

    res.redirect('/comments');
  });
});

module.exports = router;
