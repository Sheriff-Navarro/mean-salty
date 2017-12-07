var express = require('express');
const Recipe = require('../models/recipe-model');
var mongoose = require('mongoose');
var router = express.Router();

router.get('/', (req, res, next) => {
  Recipe.find((err, recipesList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(recipesList);
  });
});

router.post('/', (req, res) => {
  console.log("first log")
  const recipe = new Recipe({
    name: req.body.name,
    // ingredients: JSON.parse(req.body.ingredients) || [],
    // directions: JSON.parse(req.body.directions) || [],
    // image: {
    //   type: String,
    //   default: ''
    // },
    // cookTime: req.body.cookTime
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


module.exports = router;
