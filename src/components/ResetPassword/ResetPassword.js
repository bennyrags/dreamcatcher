import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import qs from 'qs';

const urlSplit = window.location.href.split('=');

class ResetPassword extends Component {
state = {
username: '',
password: '',
email: '',
updated: false,
isLoading: true,
error: false,
}

parseParams = () => {
    // console.log(`this is window location search`, window.location.search);
    // console.log(`this is window location HASH`, window.location.hash);
    // console.log(`this is window location HASH SPLIT`, window.location.hash.split('='));
    this.setState({
        ...this.state, 
        email: window.location.hash.split('=')[2]
    })
    const splitEq = window.location.hash.split('=')[1];
    //console.log(`splitEq`, splitEq);
    const token = splitEq.split('&')[0];
    
    this.setToken(token);
    //console.log(`token in parseParams Function,`, token);    
}

setToken = (token) => {
//console.log(`inside setToken function, here is token`, token);
    return token;
}

async componentDidMount() {

const questParse = window.location.hash.split('?').slice(1);
  const parsedParams=  qs.parse(questParse[0]);

      try {
      //  console.log(`this is token,`, this.setToken() );

const response = await axios.get(`api/checktoken/?resetPasswordToken=${parsedParams.token}`)
    
// console.log(`response data from axios call:`, response.data);
// console.log(`response data message from axios call:`, response.data.message);
    
    if (response.data.message === 'password reset link a-ok') {
        this.setState({
            ...this.state,
            username: response.data.username,
            isLoading:false
        })
//        console.log(`this is state after a OK response:`, this.state);
    }

    else {
      this.setState({
        ...this.state,
        isLoading: false,
        error:true
    }) 
 //   console.log(`this is state after failed axios call,`, this.state);
    
    }

      }
      catch (err) {
 //         console.log(`this is error in async comp did mount:`, err);
            
      }

    
}//end compDidMount

updatePassword = async (e) => {
    e.preventDefault();
    const { username, password, resetPasswordToken } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put('api/resetpassword',
        {
          username,
          password,
          resetPasswordToken: token,
        },
      );
      //console.log(response.data);
      if (response.data === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }; //end updatePassword


goToPage = page => {
  this.props.history.push(page);
}


handleChange = name => event => {
    this.setState({
        ...this.state,
        [name]: event.target.value
    })
    }



render(){
 
  if (this.state.error) {
    return (
<div>
  <h1>Reset Password Page </h1>
  <h4>There was a problem reseting your password. Please send another reset link</h4>
<Button
onClick={()=>this.goToPage('/')}
>
  Home
</Button>
<Button
onClick={()=>this.goToPage('/forgot-password')}
>
  Forgot Password
</Button>
</div>
    )
  }

  else if (this.state.updated) {
    return (
      <div>
        <h1>Reset Password Page</h1>
      <h2>You're Password has been reset. Click below to login.</h2>
      <Button
onClick={()=>this.goToPage('/')}
>
  Login
</Button>
      </div>
    )
  }
 
  else {
  return(
     <div>
       <h1>Reset Password Page </h1>

     
     <form onSubmit={this.updatePassword}>
                <TextField
                    id='password'
                    label='new password'
                    value={this.state.password}
                   onChange={this.handleChange('password')}
                    placeholder='New Password'
                    type='password'
                />
                <br />
                <Button
                    type='submit'
                >
                    Submit
                </Button>

            </form>
                    </div>
    )
}

}

}//end Class

export default ResetPassword;

