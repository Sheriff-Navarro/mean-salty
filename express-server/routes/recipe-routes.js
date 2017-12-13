var express = require('express');
const passport = require('passport');
const {ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Recipe = require('../models/recipe-model');
const Review = require('../models/review-model');
const User = require('../models/user-model');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
//RETRIEVE ALLRECIPES <--START-->
router.get('/', (req, res, next) =>{
  Recipe.find({}, (err, recipe) => {
    if(err) {return next(err) }
    res.render('recipes/index', {
      recipe: recipe
    })
  })
})
//RETRIEVE ALLRECIPES <--END-->

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
    // image: {
    //   type: String,
    //   default: ''
    // },
  });
  newRecipe.save((err) => {
    if (err) {
      res.render('.recipes/new', {recipe: newRecipe});
    } else{
      res.redirect('./recipes');
    }
  });
});
//CREATE A NEW RECIPE <--END-->

//ADD A Review TO A RECIPE <--START-->
router.post('/:id/newreview', ensureLoggedIn('auth/enter'), (req, res, next) => {
  console.log('user', req.user._id);
  console.log('recipe', req.params.id);
  const recipeParamId = req.params.id;
  const newReview = new Review({
    _creator: req.user._id,
    recipeId: recipeParamId,
    rating: req.body.rating,
    review: req.body.review
  });
  newReview.save((err) => {
    if (err) {
      res.render('./recipes', {review: newReview});
    } else {
      res.redirect('./recipes')
    }
  })
})

//RETRIEVE SPECIFIC RECIPE <--START-->
router.get('/:id', (req, res) => {
  console.log('recipe',req.params.id);
  console.log('user',req.user._id)
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Requested recipe does not exist'});
    return;
  }
  Recipe.findById(req.params.id, (err, theRecipe) => {
    if (err) {
      res.json(err);
      return;
    }
    res.render('./recipes/details', {recipe: theRecipe});
  });
});
//RETRIEVE SPECIFIC RECIPE <--END-->




//EDIT A SPECIFIC RECIPE <--START-->
router.put('/:id', (req, res) =>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Requested recipes does not exist'})
    return;
  }
  const updates = {
    name: req.body.name,
    cookTime: req.body.cookTime,
    serves: req.body.serves,
    kindOfDish: req.body.kindOfDish
  };

  Recipe.findByIdAndUpdate(req.params.id, updates, (err) => {
  if (err) {
    res.json(err);
    return;
  }
  res.json({
    message: 'Recipe updated successfully',
    recipe: updates
    });
  });
});
//EDIT A SPECIFIC RECIPE <--END-->


router.post('/:id/delete', (req, res, next) => {
  //authorize recipe middleware needed
  const recipeId = req.params.id;
  Recipe.findByIdAndRemove(recipeId, (err, recipe) => {
    if (err) {return next (err);}
     res.redirect('/recipes')
  })
})
//DELETE A SPECIFIC RECIPE <--END-->

module.exports = router;
