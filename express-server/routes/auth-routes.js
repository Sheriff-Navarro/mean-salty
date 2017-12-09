const router = require('express').Router();


//auth login
router.get('/enter', (req,res)=>{
  res.render('enter')
})

//auth logout
router.get('/logout', (req,res) =>{
  res.send('loggingout');
})


//auth with google
router.get('/google', (req, res) =>
{
  //handle with passport
  res.send('logging in with google');
})


module.exports = router;
