var express = require('express');
const passport = require('passport');
const {ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Recipe = require('../models/recipe-model');
const Review = require('../models/review-model');
const User = require('../models/user-model');
const authorizeRecipe = require('../middleware/recipe-authorization');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
//RETRIEVE ALLRECIPES <--START-->
router.get('/', (req, res, next) =>{
  Recipe.find({}, (err, recipe) => {
    if(err) {return next(err) }
    res.json(recipe)
    console.log(recipe)
  })
})
//RETRIEVE ALLRECIPES <--END-->

// router.get('/', (req, res, next) =>{
//   Recipe.find({}, (err, theRecipe) => {
//     if(err) {return next(err) }
//     User.find({}, (err, theUser)=>{
//     if(err) { return next (err)}
//     const data = {
//       recipe: theRecipe,
//       user: theUser
//     }
//     res.json(data)
//     console.log(data)
//     })
//   })
// })


//create a new recipe page <--start-->
router.get('/new', (req, res) => {
  res.render('./recipes/new');
})

//CREATE A NEW RECIPE <--START-->
router.post('/', ensureLoggedIn('auth/enter'), (req, res, next) => {
  console.log("first log")
  console.log('user', req.user._id)
  const newRecipe = new Recipe({
    _creator: req.user._id,
    name: req.body.name,
    cookTime: req.body.cookTime,
    serves: req.body.serves,
    kindOfDish: req.body.kindOfDish,
    // ingredients: JSON.parse(req.body.ingredients) || [],
    // directions: JSON.parse(req.body.directions) || [],

  });
  newRecipe.save((err) => {
    if (err) {
      res.render('/recipes/new', {recipe: newRecipe});
    } else{
      res.redirect('/recipes');
    }
  });
});
//CREATE A NEW RECIPE <--END-->


//ADD A Review TO A RECIPE <--START-->
router.post('/:id/newreview',
 ensureLoggedIn('auth/enter'), (req, res, next) => {
   console.log("NEW REVIEW CODE");
     const recipeParamId = req.params.id;
     const newReview = new Review({
       _creator: req.user._id,
       creatorFirst: req.user.fistName,
       creatorLast: req.user.lastName,
       creatorThumbnail: req.user.thumbnail,
       // recipeId: recipeParamId,
       recipeId: req.params.id,
       rating: req.body.rating,
       review: req.body.review
  });
  newReview.save((err, theReview) => {
    if (err) {return next(err);}
     else {
       res.redirect('/recipes/' + req.params.id);
        }
      })
})
//ADD A Review TO A RECIPE <--END-->


//RETRIEVE SPECIFIC RECIPE PUSHING BOTH RECIPE AND review TO THE VIEW <--START-->
router.get('/:id', (req, res) => {
  console.log('recipe',req.params.id);
  // console.log('user',req.user._id)
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Requested recipe does not exist'});
    return;
  }
  console.log("BEFORE RECIPE FIND");
  Recipe.findById(req.params.id, (err, theRecipe) => {
    if (err)  {return next(err);}
    User.findById({_id: theRecipe._creator}, (err, recipeCreator) => {
      console.log("creator of the recipe", theRecipe._creator );
    if (err) {return next(err);}
    Review.find({recipeId: req.params.id}, (err, theReview) =>{
      if (err) {return next(err);}

        const data = {
          recipe: theRecipe,
          recipeOwner: recipeCreator,
          review: theReview,
        }
        res.json(data)
        })
      });
    });
  });
//RETRIEVE SPECIFIC RECIPE <--END-->

//GET EDIT VIEW ROUTE <--START-->
router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) =>{
  const recipeId = req.params.id;
  Recipe.findById(recipeId, (err, recipe) => {
    if(err) {return next(err) }
    res.render('recipes/edit', {recipe: recipe})
  })
});
//GET EDIT VIEW ROUTE <--END-->

//EDIT A SPECIFIC RECIPE <--START-->
router.post('/:id/edit', ensureLoggedIn('/login'), (req, res) =>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Requested recipes does not exist'})
    return;
  }
  const updates = {
    name: req.body.name,
    cookTime: req.body.cookTime,
    serves: req.body.serves,
    // kindOfDish: req.body.kindOfDish
  };

  Recipe.findByIdAndUpdate(req.params.id, updates, (err, updatedRecipe) => {
  if (err){ return next(err);}
  console.log('recipe id ', updatedRecipe)
  return res.redirect(`/recipes/${updatedRecipe._id}`)
  // res.json({
  //   message: 'Recipe updated successfully',
  //   recipe: updates
  //   });
  });
});
//EDIT A SPECIFIC RECIPE <--END-->

//DELETE A SPECIFIC RECIPE <--START-->
// router.post('/:id/delete', (req, res, next) => {
//   //authorize recipe middleware needed
//   const recipeId = req.params.id;
//   Recipe.findByIdAndRemove(recipeId, (err, recipe) => {
//     if (err) {return next (err);}
//      res.redirect('/recipes')
//   })
// })

router.delete('/:id', (req, res) => {
  console.log(req.params.id);
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Recipe.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Recipe has been removed!'
    });
  })
});
//DELETE A SPECIFIC RECIPE <--END-->

module.exports = router;
