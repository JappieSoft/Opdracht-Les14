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

      {authenticated === false &&
      <div>
        <button
          type="button"
          onClick={() => navigate('/signin')}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
        >
          Registreren
        </button>
      </div>}

      {authenticated === true &&
        <div>
        <button
            type="button"
            onClick={() => logOut()}
        >
          Log Uit
        </button>
      </div>}
    </nav>
  );
}

export default NavBar;