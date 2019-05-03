import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RegistrationPage.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
class RegisterPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  };


  registerHorrace = () => {
    this.setState({
      firstName: 'Horrace',
      lastName: 'Muzhik',
      email: 'horrace@bronx.com',
      username: 'horracem',
      password: 'horracem',
    })
  }

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
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <>
        <section className='containerHeader'>
        <button className='horrace' onClick={this.registerHorrace}></button>

          <h1>Register User</h1>
        </section>
        <section className='containerMiddle'>
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}

          <form onSubmit={this.registerUser}>
<Grid
container
direction='row'
justify='space-evenly'
spacing={24}
className='gridContainer'
>
<Grid item xs={6}> 
<label> First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChangeFor('firstName')}
            />
</Grid>
<Grid item xs={6}>
<label> Last Name</label>
            <input
              label='Last Name'
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChangeFor('lastName')}
            />
</Grid>
<Grid item xs={12}>
<label>Email</label>
            <input
              label='Email'
              type="text"
            name="email"
              value={this.state.email}
              onChange={this.handleInputChangeFor('email')}
            />
</Grid>
<Grid item xs={6}> 
<label>Username</label>
            <input
              label='Username'
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
            />
</Grid>
<Grid item xs={6}>            
<label>Password</label>
            <input
              label='Password'
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />

</Grid>

<Grid item xs={6}>            
            <Button
              className="register"
              type="submit"
              name="submit"
              value="Register"
            > Register </Button>
            </Grid>
            </Grid>
          </form>
        </section>
        <section className='containerBottom'>
          <center>
            <Button
              type="button"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
            >
              Login
          </Button>
          </center>
        </section>
      </>
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

