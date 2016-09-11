import React from 'react';
import {Link} from 'react-router';
import Login from './Login';

// var loginButton;
// if (loggedIn) {
//   loginButton = <LogoutButton />;
// } else {
//   loginButton = <LoginButton />;
// }

const HomePage = () => {
  return (
    <div>
        <Login/>
    </div>
  );
};

export default HomePage;
