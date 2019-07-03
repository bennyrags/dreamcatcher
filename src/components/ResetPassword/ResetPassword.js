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
error: false
}

parseParams = () => {
    console.log(`this is window location search`, window.location.search);
    console.log(`this is window location HASH`, window.location.hash);
    console.log(`this is window location HASH SPLIT`, window.location.hash.split('='));
    this.setState({
        ...this.state, 
        email: window.location.hash.split('=')[2]
    })
    const splitEq = window.location.hash.split('=')[1];
    console.log(`splitEq`, splitEq);
    const token = splitEq.split('&')[0];
    
    this.setToken(token);
    console.log(`token in parseParams Function,`, token);
    
    // const token = splitEq.split('&')[0];
    // console.log(`here is token:`, token)

    // console.log(`this is window location HASH QS PARSE`, qs.parse(window.location.hash));

    // console.log(`this is urlSplit[1]`, urlSplit[1]);
    // return urlSplit[0]
    

    //return urlSplit[urlSplit.length-1];
    
}

setToken = (token) => {
console.log(`inside setToken function, here is token`, token);

    return token;
}

async componentDidMount() {
console.log(`this is getToken:`, this.parseParams());

// const urlSplit =   window.location.href.split('/');
// const token = urlSplit[urlSplit.length-1];
//console.log(`setToken`, this.setToken());

      try {
      //  console.log(`this is token,`, this.setToken() );


const response = await axios.get('api/reset/?resetPasswordToken=sadfasdf')
    console.log(`response from axios call:`, response);
    
    if (response === 'password reset link a-ok') {
        this.setState({
            ...this.state,
            username: response.data.username,
            isLoading:false
        })
    }

      }
      catch (err) {
          console.log(`this is error in async comp did mount:`, err);
        this.setState({
            ...this.state,
            isLoading: false,
            error:true
        })      
      }

    
}//end compDidMount

updatePassword = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await axios.put('/updatePasswordViaEmail',
        {
          email,
          password,
          resetPasswordToken: token,
        },
      );
      console.log(response.data);
      if (response.data.message === 'password updated') {
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











handleChange = name => event => {
    this.setState({
        ...this.state,
        [name]: event.target.value
    })
    }



render(){
    return(
        <div>
     <form onSubmit={this.sendEmail}>
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

}//end Class

export default ResetPassword;

