const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('Connecting to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const postSchema = new mongoose.Schema({
  postHeader: String,
  postContent: String,
  postDate: Date,
});

module.exports = mongoose.model('Post', postSchema);
