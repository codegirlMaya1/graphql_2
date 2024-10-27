import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul className="list-group">
        {posts.map(post => (
          <li key={post.id} className="list-group-item">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
            <small>ID: {post.id}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
