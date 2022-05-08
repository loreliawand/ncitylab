import { useState, useEffect } from 'react';
import axios from 'axios';

import Footer from './components/Footer';
import Header from './components/Header';
import Post from './components/Post';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPostHeader, setNewPostHeader] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('All systems are working normally');
    axios.get('http://localhost:3001/posts').then((response) => {
      console.log('Promise fullfield!');
      setPosts(response.data);
    });
  }, []);
  console.log('Rendered', posts.length, 'posts in 4 different languages');

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const makeSearch = (event) => {
    event.preventDefault();
    console.log(posts.filter((post) => post.postContent.includes(search)));
  };

  let resultOfSearch = posts.filter((post) =>
    post.postContent.includes(search)
  );

  const handlePostHeaderChange = (event) => {
    setNewPostHeader(event.target.value);
  };

  const handlePostContentChange = (event) => {
    setNewPostContent(event.target.value);
  };

  return (
    <div className="flex">
      <Header />
      <div>
        <h5 style={{ margin: '5px' }}>Searching</h5>
        <form
          onSubmit={makeSearch}
          style={{ marginLeft: '5px', marginBottom: '5px' }}
        >
          <input value={search} onChange={handleSearchChange} />
        </form>
      </div>
      <div className="flex-inside">
        {resultOfSearch.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setShowForm(!showForm)}>Add new post</button>
        <div className={showForm ? null : 'hidden'}>
          <form onSubmit={addPost} style={{ marginTop: '15px' }}>
            <label>
              Header:
              <br />
              <input
                value={newPostHeader}
                onChange={handlePostHeaderChange}
                style={{ margin: '5px' }}
              />
            </label>
            <br />
            <label>
              Content:
              <br />
              <textarea
                style={{ width: '95%', height: '100px', margin: '5px' }}
                value={newPostContent}
                onChange={handlePostContentChange}
              />
            </label>
            <button type="submit">Send post</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
