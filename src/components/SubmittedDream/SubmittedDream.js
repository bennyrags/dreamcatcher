import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import {HashRouter as Router} from 'react-router-dom';

class SubmittedDream extends Component {

home = () => {
    console.log('in saveDream');
    this.props.history.push('/')
}

dreamList = () => {
    this.props.history.push('/dreams')
}

    render() {
        return(
            <>
            <h1>Thank You For Submitting Your Dream</h1>
           <p>
               Your dream has been saved. 
           </p>

        <Button onClick={this.home}>Home</Button>
        <Button onClick={this.dreamList}>See Dreams</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    newDream: state.dreamAdd
  });
  
  export default connect(mapStateToProps)(SubmittedDream);
  