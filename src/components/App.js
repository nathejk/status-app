import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const App = (props) => {
  return (
    <div>
      <AppBar
        title="Nathejk"
        iconElementRight={<FlatButton label="log ud" />}
        style={{backgroundColor:'black'}}
      />
      <IndexLink to="/">Home</IndexLink>
      {' | '}
      <Link to="/fuel-savings">Demo App</Link>
      {' | '}
      <Link to="/about">About</Link>
      <br/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;


