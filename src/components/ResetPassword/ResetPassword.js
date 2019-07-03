import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

class ResetPassword extends Component {
state = {
username: '',
password: '',
updated: false,
isLoading: true,
error: false
}



async componentDidMount() {

const urlSplit =   window.location.href.split('/');
const token = urlSplit[urlSplit.length-1];


      try {
        console.log(`this is token,`, token );


const response = await axios.get('/reset',  {
    params: {
        resetPasswordToken: token
    }
})
    console.log(`response from axios call:`, response);
    
      }
      catch (err) {
          console.log(`this is error in async comp did mount:`, err);
          
      }

    
}


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

}

export default ResetPassword;

