const router = require('express').Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// const express = require('express');
// var router = express.Router();

/* GET users listing. */
router.get('/', ensureLoggedIn('/enter'), (req, res) => {
  res.render('profile', {user: req.user});
});
//add edit for user profile
//router.put('/:id/edit')



//add bookmarked recipe to profile
//router.put('/bookmarkrecipe')
//find the recipe id push that to profile's bookmarkrecipe array
//save profile

module.exports = router;
