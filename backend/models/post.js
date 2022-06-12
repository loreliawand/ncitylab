const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  postHeader: {
    type: String,
    minlength: 3,
    required: true,
  },
  postContent: {
    type: String,
    minlength: 3,
    required: true,
  },
  postDate: Date,
})

postSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Post', postSchema)
