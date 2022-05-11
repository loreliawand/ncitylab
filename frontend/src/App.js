import axios from 'axios';
import { useState, useEffect } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import Post from './components/Post';

import postService from './services/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPostHeader, setNewPostHeader] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('All systems are working normally');
    postService.getAll().then((initialPosts) => {
      setPosts(initialPosts);
    });
  }, []);
  console.log('Rendered', posts.length, 'posts in 4 different languages');

  const addPost = (event) => {
    event.preventDefault();
    const postObject = {
      postDate: new Date().toISOString(),
      postHeader: newPostHeader,
      postContent: newPostContent,
      id: posts.length + 1,
    };

    postService.create(postObject).then((returnedPost) => {
      setPosts(posts.concat(returnedPost));
      setNewPostHeader('');
      setNewPostContent('');
    });
  };

  const deletePost = () => {
    postService.clear();
  }; // need to implement

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const makeSearch = (event) => {
    event.preventDefault();
    console.log(posts.filter((post) => post.postContent.includes(search)));
  };

  let resultOfSearch = posts.filter((post) =>
    post.postContent.includes(search)
  ); // need to implement

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
        <h5 style={{ margin: '5px' }}>Searching (not working for now)</h5>
        <form
          onSubmit={makeSearch}
          style={{ marginLeft: '5px', marginBottom: '5px' }}
        >
          <input value={search} onChange={handleSearchChange} />
        </form>
      </div>
      <div className="flex-inside">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <button onClick={() => deletePost()}>
          Delete post (not working for now)
        </button>
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
