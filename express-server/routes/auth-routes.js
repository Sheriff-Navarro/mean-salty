const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user-model');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.fullName;


  if (!username || !password) {
    res.status(400).json({ message: 'Please provide a username and password' });
    return;
  }

  User.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass,
      fullName
    });

    theUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Unable to save the new user.' });
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }

        res.status(200).json(req.user);
      });
      })
    });
  });


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'You have successfully been logged out!'});
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Sorry, it appears you are not logged in."})
})


router.get('/private', (req, res, next) => {
if(req.isAuthenticated()) {
  res.json({ message: 'User is allowed to view'})
}

res.status(403).json({ message: 'Sorry, it appears you are unauthorized to view this page'})
})










//
// // auth login
// router.get('/enter', ensureLoggedOut(), (req,res)=>{
//   res.render('enter', {user: req.user} )
// })
//
//
// //auth logout
// router.get('/logout', ensureLoggedIn('enter'), (req,res) =>{
//   req.logout();
//   res.redirect('/');
// })
//
//
// //auth with google
// router.get('/google', passport.authenticate('google',{
//   scope: ['profile']
// }));
//
// router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
//   // res.send(req.user)
//   res.redirect('/profile', {user: req.user});
// })

module.exports = router;
