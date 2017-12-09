const router = require('express').Router();
const passport = require('passport');

// const express = require('express');
// var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('You are logged in, this is your profile ',+req.user.username);
});

module.exports = router;
