import { React, useState } from 'react';

const Header = () => {
  const [title, setTitle] = useState('Blog example');
  return (
    <div className="blogHeader">
      <h1>{title}</h1>
      <div className="buttons">
        <button onClick={() => setTitle('Blog example')}>English</button>
        <button onClick={() => setTitle('Przyklad bloga')}>Polski</button>
        <button onClick={() => setTitle('Пример блога')}>Русский</button>
        <button onClick={() => setTitle('Приклад блога')}>Українська</button>
      </div>
    </div>
  );
};

export default Header;
