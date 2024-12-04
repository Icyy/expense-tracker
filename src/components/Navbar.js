import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    background: '#000',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    position: 'sticky',
    top: '0',
    width: '100%',
    zIndex: 1000,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)',
  };

  const linkStyle = {
    color: '#00ff7f',
    // textDecoration: 'none',
    // fontSize: '18px',
    // fontWeight: 'bold',
    // fontFamily: 'open sans'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/register" style={linkStyle}>Register</Link>
    </nav>
  );
};

export default Navbar;
