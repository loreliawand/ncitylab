const postsRouter = require('express').Router()
const { request } = require('express')
const Post = require('../models/post')

postsRouter.get('/', (request, response) => {
  Post.find({}).then((posts) => {
    response.json(posts)
  })
})

postsRouter.get('/:id', (request, response, next) => {
  Post.findById(request.params.id)
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

postsRouter.post('/', (request, response, next) => {
  const body = request.body

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

postsRouter.delete('/:id', (request, response, next) => {
  Post.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

postsRouter.put('/api/posts/:id', (request, response, next) => {
  const body = request.body

  const post = {
    postHeader: body.postHeader,
    postContent: body.postContent,
  }

  Post.findByIdAndUpdate(request.params.id, post, {
    new: true,
  })
  post
    .then((updatedPost) => {
      response.json(updatedPost)
    })
    .catch((error) => next(error))
})

module.exports = postsRouter
