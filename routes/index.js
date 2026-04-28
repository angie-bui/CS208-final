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
  const name = req.body.name;
  const message = req.body.message;

  const sql = 'INSERT INTO comments (name, message) VALUES (?, ?)';

  db.query(sql, [name, message], (err) => {
    if (err) {
      console.error('Error saving comment:', err);
      return res.redirect('/comments');
    }

    res.redirect('/comments');
  });
});

module.exports = router;
