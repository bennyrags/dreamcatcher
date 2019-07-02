import react, { Component } from 'react';
import axios from 'axios';

class ResetPassword extends Component {
state = {
username: '',
password: '',
updated: false,
isLoading: true,
error: false
}

async componentDidMount() {
    try {
        console.log(`inside async comp did mount`);
        
    }
    catch (error) {
        console.log(`error in async comp did mount`, error);
        
    }
}

}

export default ResetPassword;

