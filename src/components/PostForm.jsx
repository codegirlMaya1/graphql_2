import React, { useState, useEffect } from 'react';

const PostForm = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleCreatePost = () => {
    const newPostId = parseInt(postId);
    const postExists = posts.some(post => post.id === newPostId);
    
    if (!isNaN(newPostId) && !postExists) {
      const newPost = {
        id: newPostId,
        title,
        body,
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setTitle('');
      setBody('');
      setPostId('');
    } else {
      alert('ID must be a unique number.');
    }
  };

  const handleUpdatePost = () => {
    const newPostId = parseInt(postId);
    if (!isNaN(newPostId)) {
      const updatedPosts = posts.map(post => 
        post.id === newPostId ? { ...post, title, body } : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setTitle('');
      setBody('');
      setPostId('');
    } else {
      alert('ID must be a number.');
    }
  };

  const handleDeletePost = (id) => {
    const remainingPosts = posts.filter(post => post.id !== id);
    setPosts(remainingPosts);
    localStorage.setItem('posts', JSON.stringify(remainingPosts));
  };

  return (
    <div>
      <h2>Post Form</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          placeholder="Post ID (for update/delete)"
          className="form-control"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="form-control"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className="form-control"
        />
        <button onClick={handleCreatePost} className="btn btn-primary mt-2">Create Post</button>
        <button onClick={handleUpdatePost} className="btn btn-warning mt-2">Update Post</button>
      </form>
      <ul className="list-group mt-3">
        {posts.map(post => (
          <li key={post.id} className="list-group-item">
            <div>
              <h5>{post.title}</h5>
              <p>{post.body}</p>
              <small>ID: {post.id}</small>
              <button onClick={() => handleDeletePost(post.id)} className="btn btn-danger btn-sm mt-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostForm;
