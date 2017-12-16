const mongoose = require('mongoose');
const Recipe = require('./recipe-model');
const User = require('./user-model');
const Schema   = mongoose.Schema;

const ReviewSchema = new Schema ({
  recipeId: {type: Schema.Types.ObjectId, ref: 'Recipe', required: true},
  _creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  creatorFirst: {
    type: String
  },
  creatorLast: {
    type: String
  },
  creatorThumbnail: {
    type: String
  },
  rating: {
    type: Number,
    required: [true, 'A rating is required!']
  },
  review: {
    type: String
  }

})

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
//
// creatorFirst: req.user.fistName,
// creatorLast: req.user.lastName,
// creatorThumbnail: req.user.thumbnail,
