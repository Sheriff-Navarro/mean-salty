const router = require('express').Router();
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// auth login
router.get('/enter', ensureLoggedOut(), (req,res)=>{
  res.render('enter', {user: req.user} )
})


//auth logout
router.get('/logout', ensureLoggedIn('enter'), (req,res) =>{
  req.logout();
  res.redirect('/');
})


//auth with google
router.get('/google', passport.authenticate('google',{
  scope: ['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  // res.send(req.user)
  res.render('profile', {user: req.user});
})

module.exports = router;
