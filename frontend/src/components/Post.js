import React from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/posts';

const Post = ({ post }) => {
  return (
    <div className="post">
      <p className="postDate">{post.postDate}</p>
      <h3 className="postHeader">{post.postHeader}</h3>
      <p className="postContent">{post.postContent}</p>
      <button
        onClick={() =>
          axios.delete(`${baseUrl}/${post.id}`).then(window.location.reload())
        }
      >
        Delete
      </button>
    </div>
  );
};

export default Post;
