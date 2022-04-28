const Footer = () => {
  return (
    <div className="footer">
      <p>Created by L.W.</p>
    </div>
  );
};

const Future = () => {
  return (
    <div>
      <h1>Future is coming</h1>
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
