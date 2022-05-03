import Footer from './components/Footer';
import Header from './components/Header';
import Post from './components/Post';

const App = ({ posts }) => {
  console.log('All systems are working normally');

  return (
    <div className="flex">
      <Header />
      <div className="flex-inside">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
