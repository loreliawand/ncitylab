const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log('Hello from component. All systems are working normally');
  return (
    <div>
      <p>Hello world, my name is Lora, and it is {now.toString()}</p>
      <p>
        Test: {a} + {b} = {a + b}
      </p>
    </div>
  );
};

export default App;
