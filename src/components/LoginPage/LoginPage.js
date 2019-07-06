import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  forgotPW = () => {
this.props.history.push('/forgot-password')
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <>
      <div className='containerHeader'>
      <h1>Login</h1>
      </div>
      
      <section className='containerMiddle'>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login}>
          
          <div className='loginFieldContainer'>
          <h4>Username</h4>
          <input
          type='username'
          label='Username'
          value={this.state.username}
          onChange={this.handleInputChangeFor('username')}    
          
          className='tempTextFieldClass'
          />
          </div>

          <div className='loginFieldContainer'>
          <h4>Password</h4>
          <input
          type='password'
          label='Password'
          value={this.state.password}
          onChange={this.handleInputChangeFor('password')}
            />
            <br />
            <a className='forgotPw' onClick={this.forgotPW}>Forgot your Password?</a>
          </div>

          <div>
            <Button
              className="log-in"
              type="submit"
              name="submit"
            >
            Log In
            </Button>
          </div>
        </form>
        </section>


        <section className='containerBottom'>
        <center>



          <Button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
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

export default connect(mapStateToProps)(LoginPage);
