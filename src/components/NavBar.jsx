import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import logo from '../assets/banana-01.png';
import { useNavigate, Link } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const {authenticated, logOut} = useContext(AuthContext);
  console.log(`authenticated = ${authenticated}`);

  return (
    <nav>
        <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
        </Link>

      <div>
        {authenticated === false &&
        <button
          type="button"
          onClick={() => navigate('/signin')}
        >
          Log in
        </button>}
        {authenticated === false &&
        <button
          type="button"
          onClick={() => navigate('/signup')}
        >
          Registreren
        </button>}
        {authenticated === true &&
        <button
            type="button"
            onClick={() => logOut()}
        >
          Log Uit
        </button>}
      </div>
    </nav>
  );
}

export default NavBar;