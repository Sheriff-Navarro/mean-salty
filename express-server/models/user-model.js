const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A username is required']
  },
  password: {
    type: String,
    required: [true, 'A password is required']
  },
  // googleId: String,
  thumbnail: String,
  fullName: String,
  savedRecipes: [],
  paidRecipes: []

},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);


const User = mongoose.model('User', UserSchema);

module.exports = User;
