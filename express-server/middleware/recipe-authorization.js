const Recipe = require('../models/recipe-model.js');

// function authorizeRecipe(req, res, next) {
//   console.log("req.user=", req.user);
//     Recipe.findById(req.params.id, (err, recipe)=> {
//       //if there's an error, forward it
//       if(err) {return next(err) }
//       //if there is no recipe return a 404 error
//       if(!recipe){ return next(new Error('404'))}
//       //if the recipe belongs to the user, next()
//       if (recipe.belongsTo(req.user)){
//         return next()
//       } else {
//         return res.redirect(`/profile`)
//       }
//       })
//     }


function authorizeRecipe(req, res, next){
    Recipe.findById(req.params.id, (err, recipe) => {
//if there's an error, forward it
      if(err) { return next(err) }
      //if there is no car return a 404
      if(!car){ return next(new Error('404'))}
      //if the car belongs to the user, next()
      if (recipe.belongsTo(req.user)){
        return next()
      } else {
        return res.redirect(`/profile`)
      }
    });
}


module.exports = authorizeRecipe;
