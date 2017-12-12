const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name of the dish is required!']
  },
  ingredients: {
    type: Array,
    default: []
  },
  directions: {
    type: Array,
    default: []
  },
  image: {
    type: String,
    default: ''
  },
  cookTime: {
    type: Number,
    default: 15
  },
  serves: {
    type: Number,
    default: 2
  },
  kindOfDish: {
        type: String,
        enum: ['Appetizer', 'Entré', 'Dessert', 'Snack', 'Drink'],
        default: 'Entré'
    },
  creator: {
    type: String
  }
    //need to add boolean for paid recipe
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
