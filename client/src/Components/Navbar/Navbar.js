import React from 'react';
import './navbar.css'
import { useHistory } from 'react-router-dom';

export default function Navbar() {
    const history = useHistory();

  const redirectOne = () =>{ 
    history.push('/');
  }

  const redirectTwo = () =>{ 
    history.push('/userpage');
  }

  return (
      <div className="navbarWrapper">
          <div className="linkOne">
              <span className="link" onClick={redirectOne}>MainPage</span>
          </div>
          <div className="linkTwo">
              <span className="link" onClick={redirectTwo}>UserPage</span>
          </div>
      </div>
  );
}