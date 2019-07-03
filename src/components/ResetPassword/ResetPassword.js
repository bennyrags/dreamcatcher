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

    console.log(`this.props.match.params.token:`, this.props.match);

await axios.get('/reset',  {
    params: {
        resetPasswordToken: this.props.match.params.token
    }
}) 
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

