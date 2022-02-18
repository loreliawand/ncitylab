const Hello = ({ name, age }) => {
  name = 'Lora';
  age = 26;
  const bornYear = () => new Date().getFullYear() - age;
  return (
    <div>
      <p>
        Hello world, my name is {name}, I am {age} years old.
      </p>
      <p>So I was born in {bornYear()}.</p>
      <p>This is my website :)</p>
    </div>
  );
};

const App = (props) => {
  console.log('All systems are working normally');
  const { counter } = props;
  return (
    <div>
      <h1>Greetings!</h1>
      <Hello />
      <h1>Counter</h1>
      <p>Counter refresh every second</p>
      <div>{counter}</div>
    </div>
  );
};

export default App;
