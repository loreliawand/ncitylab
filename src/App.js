const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };
  return (
    <div>
      <p>
        Hello world, my name is {props.name}, I am {props.age} years old.
      </p>
      <p>So I was born in {bornYear()}.</p>
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
