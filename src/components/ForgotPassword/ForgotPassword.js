import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core'
import axios from 'axios';


class ForgotPassword extends Component {
    state = {
        email: '',
        showError: false,
        messageFromServer: '',
        showNullError: false,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
        console.log(this.state)
    }

    sendEmail = e => {
        e.preventDefault();
        //console.log(`inside sendEmail func, heres this.state.email`, this.state.email);

        if (this.state.email === '') {
           // console.log(`this hit the if state email equals nothing`)
            this.setState({
                showError: false,
                messageFromServer: '',
                showNullError: true,
            });

        }
        else {
            axios.post('/api/forgotpassword',
                {
                    email: this.state.email
                })
                .then(response => {
                    console.log(response.data);
                    if (response.data === 'email not in db') {
                        this.setState({
                            showError: true,
                            messageFromServer: ''
                        })
                    }
                    else if (response.data === 'recovery email sent') {
                        this.setState({
                            showError: false,
                            messageFromServer: 'recovery email sent'
                        })
                    }

                })
                .catch(error => {
                    alert('There was a problem resetting your password, please try again later.')
                    
                });
        }

    } //end send email

    render() {

        return (
            <>
                <form onSubmit={this.sendEmail}>
                    <h1>Enter Email to Reset Password</h1>
                    <TextField
                        id='email'
                        label='email'
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        placeholder='Email Address'
                    />
                    <br />
                    <Button
                        type='submit'
                    >
                        Submit
                </Button>

                </form>
                {this.state.messageFromServer === 'recovery email sent' && (
                    <div>
                        <p>
                            Recovery email has been sent. Please click on link in email.
                    </p>
                    </div>
                )}

                {this.state.showNullError && (
                    <div>
                        <p>
                            The email address cannot be empty
                </p>
                    </div>
                )}

                {this.state.showError && (
                    <div>
                        <p>
                            The email address isnt recognized. Please try again or register for a new account
                </p>
                        <Button
                            link={'/register'}
                        />
                    </div>
                )}
            </>
        );
    }

}


export default ForgotPassword;