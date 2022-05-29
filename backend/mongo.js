const mongoose = require('mongoose')
const Post = require('./models/post')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Lorelia:${password}@cluster.yj9aq.mongodb.net/database?retryWrites=true&w=majority`
console.log(url)

mongoose.connect(url)

Post.countDocuments({}, function (error, result) {
  if (error) {
    console.log(error)
  } else {
    response.json('Blog has ' + result + 'posts for now')
  }
})
