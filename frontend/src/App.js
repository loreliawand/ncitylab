import { useState } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Post from './components/Post';

const App = (props) => {
  console.log('All systems are working normally');
  const [posts, setPosts] = useState([props.posts]);
  const [newPostHeader, setNewPostHeader] = useState("It's a header, yeah");
  const [newPostContent, setNewPostContent] = useState(
    "It's just a sample, ok?"
  );
  const [showForm, setShowForm] = useState(false);

  const addPost = (event) => {
    event.preventDefault();
    const postObject = {
      date: new Date().toISOString(),
      header: newPostHeader,
      content: newPostContent,
      id: posts.length + 1,
    };

    setPosts(posts.concat(postObject));
    setNewPostHeader('');
    setNewPostContent('');
  };

  const handlePostHeaderChange = (event) => {
    console.log(event.target.value);
    setNewPostHeader(event.target.value);
  };

  const handlePostContentChange = (event) => {
    console.log(event.target.value);
    setNewPostContent(event.target.value);
  };

  return (
    <div className="flex">
      <Header />
      <div className="flex-inside">
        {props.posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setShowForm(!showForm)}>Add new post</button>
        <div className={showForm ? null : 'hidden'}>
          <form onSubmit={addPost} style={{ marginTop: '15px' }}>
            <input
              value={newPostHeader}
              onChange={handlePostHeaderChange}
              style={{ margin: '5px' }}
            />
            <input value={newPostContent} onChange={handlePostContentChange} />
            <button type="submit">Send post</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
