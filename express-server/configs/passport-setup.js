const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');
require('dotenv').config();

passport.serializeUser((user,done)=>{
  done(null, user.id)
})

passport.deserializeUser((id ,done)=>{
  User.findById(id).then((user)=>{
    done(null, user);
  })
})

passport.use(
  new GoogleStrategy({
  //options for the google strategy
  callbackURL: '/auth/google/redirect',
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile, done)=>{
  //passport callback function
  console.log('passport callback function fired');
  console.log(profile);
  //If User exists log them into existing profile, Else Create the New user
  User.findOne({googleId:profile.id}).then((currentUser)=>{
    if(currentUser){
      //Already have the user
      console.log('User is ',currentUser)
      done(null, currentUser);
    } else{
       //If not create the user in our db.
       new User ({
         username: profile.displayName,
         googleId: profile.id,
         thumbnail: profile._json.image.url
       }).save().then((newUser) =>  {
         console.log('New User Created '+ newUser);
         done(null, newUser);
         })
       }//end of else
     })//end of User.findOne
  })
)
