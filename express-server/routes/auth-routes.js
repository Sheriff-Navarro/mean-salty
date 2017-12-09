const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/enter', (req,res)=>{
  res.render('enter')
})

//auth logout
router.get('/logout', (req,res) =>{
  res.send('logging out');
})


//auth with google
router.get('/google', passport.authenticate('google',{
  scope: ['profile']
}));
// router.get('/google', (req, res) =>
// {
//   //handle with passport
//   res.send('logging in with google');
// })
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  // res.send(req.user)
  res.render('profile');
})

module.exports = router;
