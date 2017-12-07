var express = require('express');
const Recipe = require('../models/recipe-model');
var mongoose = require('mongoose');
var router = express.Router();
//RETRIEVE ALLRECIPES <--START-->
router.get('/', (req, res, next) => {
  Recipe.find((err, recipesList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(recipesList);
  });
});
//RETRIEVE ALLRECIPES <--END-->

//CREATE A NEW RECIPE <--START-->
router.post('/', (req, res) => {
  console.log("first log")
  const recipe = new Recipe({
    name: req.body.name,
    cookTime: req.body.cookTime,
    serves: req.body.serves,
    kindOfDish: req.body.kindOfDish

    // ingredients: JSON.parse(req.body.ingredients) || [],
    // directions: JSON.parse(req.body.directions) || [],
    // image: {
    //   type: String,
    //   default: ''
    // },
  });

  recipe.save((err) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({
      message: 'New Recipe created!',
      recipe: recipe
    });
  });
});
//CREATE A NEW RECIPE <--END-->

//RETRIEVE SPECIFIC RECIPE <--START-->
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Requested recipe does not exist'});
    return;
  }
  Recipe.findById(req.params.id, (err, theRecipe) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(theRecipe);
  });
});
//RETRIEVE SPECIFIC RECIPE <--END-->

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
    message: 'Recipe updated successfully'
    });
  });
});

module.exports = router;
