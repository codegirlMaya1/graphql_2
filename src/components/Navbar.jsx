import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-purple fixed-top">
      <Link className="navbar-brand text-white" to="/">GraphQL Blog</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Posts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/post-form">Post Form</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/location-crud">Location CRUD</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
