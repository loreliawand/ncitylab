import { useState } from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <p>Created by L.W.</p>
    </div>
  );
};

const Future = () => {
  const [title, setTitle] = useState('Future is coming');
  return (
    <div>
      <h1>{title}</h1>
      <div className="buttons">
        <button onClick={() => setTitle('Future is coming')}>English</button>
        <button onClick={() => setTitle('Nadchodzi przyszlość')}>Polski</button>
        <button onClick={() => setTitle('Будущее близко')}>Русский</button>
        <button onClick={() => setTitle('Майбутнє надходить')}>
          Українська
        </button>
      </div>
    </div>
  );
};

const App = () => {
  console.log('All systems are working normally');

  return (
    <div>
      <Future />
      <Footer />
    </div>
  );
};

export default App;
