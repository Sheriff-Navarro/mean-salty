const router = require('express').Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// const express = require('express');
// var router = express.Router();

/* GET users listing. */
router.get('/', ensureLoggedIn('/enter'), (req, res) => {
  res.render('profile', {user: req.user});
});

module.exports = router;
