const Hello = (props) => {
  const now = new Date();
  return (
    <div>
      <p>
        Hello world, my name is {props.name}, I am {props.age} years old and it
        is {now.toString()}
      </p>
    </div>
  );
};

const App = () => {
  const a = 10;
  const b = 20;
  const age = 25;
  console.log('All systems are working normally');
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name="Lora" age={age} />
      <p>
        Test: {a} + {b} = {a + b}
      </p>
    </div>
  );
};

export default App;
