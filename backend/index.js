const express = require('express');
const app = express();

app.use(express.json());

let posts = [
  {
    id: 1,
    postHeader: 'Post in English',
    postContent:
      "This post was written by Me (link will be added later) in English. It's just a sample :)",
    postDate: '03.05.2022, 15:18',
  },
  {
    id: 2,
    postHeader: 'Wpis po polsku',
    postContent:
      'Ten post był napisany Mną (link będzie dołączony pózniej) po polsku. To tylko przykład :)',
    postDate: '03.05.2022, 15:20',
  },
  {
    id: 3,
    postHeader: 'Пост на русском',
    postContent:
      'Этот пост был написан Мной (ссылка будет добавлена позже) на русском. Это лишь пример :)',
    postDate: '03.05.2022, 15:23',
  },
  {
    id: 4,
    postHeader: 'Пост українською',
    postContent:
      'Цей пост був написаний Мною (посилання буде додано пізніше) українською. Це лише приклад :)',
    postDate: '03.05.2022, 15:25',
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/posts', (request, response) => {
  response.json(posts);
});

// app.get('/info', (request, response) => {
//   response.send(200).end(`Blog has ${posts.length} posts for now`, new Date());
// });

app.get('/api/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const post = posts.find((post) => post.id === id);

  if (post) {
    response.json(post);
  } else {
    response.status(404).end();
  }
});

app.post('/api/posts', (request, response) => {
  const body = request.body;

  if (!body.postHeader) {
    return response
      .status(400)
      .json({ error: 'Header missing! Please write the header!' });
  }

  if (!body.postContent) {
    return response
      .status(400)
      .json({ error: 'Content missing! Please write the content!' });
  }

  const post = {
    id: generateId(),
    postHeader: body.postHeader,
    postContent: body.postContent,
    postDate: new Date(),
  };

  posts = posts.concat(post);

  response.json(post);
});

app.delete('/api/posts/:id', (request, response) => {
  const id = Number(request.params.id);
  posts = posts.filter((post) => post.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
