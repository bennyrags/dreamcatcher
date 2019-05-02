import React, { Component } from 'react';
import {connect} from 'react-redux';
import './RegistrationPage.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RegisterPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div>
<section className='containerHeader'>
      <h1>Register User</h1>
      </section>
      <section>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          
          <div>
          <div className='loginFieldContainer'>
          <TextField
          label='First Name'
          //type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleInputChangeFor('firstName')}
          />
          </div>
          <div>
          <TextField
          label='Last Name'
          //type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleInputChangeFor('lastName')}
          />
          </div>
          <div>
          <TextField
          label='Email'
          //type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChangeFor('email')}
          />
          </div>
          <div>
          <TextField
          label='Username'
          //type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleInputChangeFor('username')}
          />
          </div>
          <div>
          <TextField
          label='Password'
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChangeFor('password')}
          />
          </div>
            <Button
              className="register"
              type="submit"
              name="submit"
              value="Register"
            > Register </Button>
          </div>
        </form>
        </section>
        <section className='containerBottom'>
        <center>
          <Button
            type="button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </Button>
        </center>
        </section>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

