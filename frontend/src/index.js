import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

const posts = [
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <App posts={posts} />
);
