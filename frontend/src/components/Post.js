import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="post">
      <p className="postDate">{post.postDate}</p>
      <h3 className="postHeader">{post.postHeader}</h3>
      <p className="postContent">{post.postContent}</p>
    </div>
  );
};

export default Post;
