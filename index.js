require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/note');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(express.static('build'));
app.use(errorHandler);

let notes = [
  {
    id: 1,
    content: "It's a sample",
    date: '2022-02-20T14:04:31.098Z',
    important: false,
  },
  {
    id: 2,
    content: "It's a sample too",
    date: '2022-02-20T14:05:46.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'Just a sample',
    date: '2022-02-23T14:06:55.298Z',
    important: false,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body;

  const note = { content: body.content, important: body.important };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
