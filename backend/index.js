require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

const Post = require('./models/post')

// morgan.token('id', function (req, res) {
//   return req.params.id
// })

morgan.token('postHeader', function (req, res) {
  return req.body.postHeader
})

app.use(express.json())
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :postHeader'
  )
)
app.use(cors())
app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/posts', (request, response) => {
  Post.find({}).then((posts) => {
    response.json(posts)
  })
})

app.get('/info', (request, response) => {
  Post.countDocuments({}, function (error, result) {
    if (error) {
      console.log(error)
    } else {
      response.json(`Blog has ${result} post(s) for now`)
    }
  })
})

app.get('/api/posts/:id', (request, response, next) => {
  Post.findOne({ id: request.params.id })
    .then((post) => {
      if (post) {
        response.json(post)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/posts', (request, response, next) => {
  const body = request.body

  if (body.postHeader === undefined) {
    return response
      .status(400)
      .json({ error: 'Header missing! Please write the header!' })
  }

  if (body.postContent === undefined) {
    return response
      .status(400)
      .json({ error: 'Content missing! Please write the content!' })
  }

  const post = new Post({
    postHeader: body.postHeader,
    postContent: body.postContent,
    postDate: new Date(),
  })

  post
    .save()
    .then((savedPost) => {
      response.json(savedPost)
    })
    .catch((error) => next(error))
})

// not working for now
app.put('api/posts/:id', (request, response, next) => {
  const { postHeader, postContent } = request.body

  const post = {
    postHeader: body.postHeader,
    postContent: body.postContent,
  }

  Post.findOneAndUpdate({ id: request.params.id }, post, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPost) => {
      response.json(updatedPost)
    })
    .catch((error) => next(error))
})

app.delete('/api/posts/:id', (request, response, next) => {
  Post.deleteOne({ id: request.params.id })
    .then((result) => {
      console.log(request.params.id)
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
