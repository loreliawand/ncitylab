const Hello = () => {
  const now = new Date();
  return (
    <div>
      <p>Hello world, my name is Lora, and it is {now.toString()}</p>
    </div>
  );
};

const App = () => {
  const a = 10;
  const b = 20;
  console.log('All systems are working normally. Welcome');
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello />
      <p>
        Test: {a} + {b} = {a + b}
      </p>
    </div>
  );
};

export default App;
