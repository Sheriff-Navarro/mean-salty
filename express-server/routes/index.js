var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/profile', (req, res) => {
  res.send('You are logged in, this is your profile ',+req.user.username);
});

module.exports = router;
