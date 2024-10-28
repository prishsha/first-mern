import React from 'react'
import { Link } from 'react-router-dom';
import '../components/NavBar.css';

const NavBar = ({colorMode, toggleColorMode}) => {
  return (
    <div className='navbar-container' key={colorMode}>
      <div className='navbar-flex'>
        <h1>
          <Link to="/"  className='navbar-title'>Product Store 🛒</Link>
        </h1>

        <div className='navbar-buttons'>
          <Link to="/create">
            <button className='icon-button'>➕</button>
          </Link>
          <button className='icon-button' onClick={toggleColorMode}>
            {colorMode === "light"? "🌙": "☀️"}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default NavBar

