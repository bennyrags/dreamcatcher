import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Button from '@material-ui/core/Button'
import {HashRouter as Router} from 'react-router-dom';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`

class UserPage extends Component {
  newDream = () => {
    console.log(`in newDream`
    );
   this.props.history.push('/step1'); 
  }

  render() {
 return( <div>
  <h1 id="welcome">
   Hi { this.props.user.first_name }
  </h1>
  <h2>welcome back</h2>
  <Button onClick={this.newDream} className='mainButton'>
    Add new Dream
  </Button>
 
  <Button className='mainButton'>
See Dreams
  </Button>
 

  {/* <p>Your ID is: {props.user.id}</p> */}
  <LogOutButton className="log-in" />
</div>
)
}
}




// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
