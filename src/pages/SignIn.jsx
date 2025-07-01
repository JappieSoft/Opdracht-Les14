import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';


function SignIn() {
    console.log ('Hello World');
    const {logIn} = useContext(AuthContext);

    return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={logIn}>
        <p>*invoervelden*</p>
          <button type="submit">
              Inloggen
          </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;