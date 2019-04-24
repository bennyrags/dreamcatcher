import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
import {HashRouter as Router} from 'react-router-dom';

class NewDreamStep3 extends Component {

nextStep = () => {
    this.props.history.push('/step4')
}

lastStep = () => {
    this.props.history.push('/step2')
}

    render() {
        return(
            <>
            <h1>How Are You Feeling?</h1>
            <h2>(mood)</h2>
<form>
  Calm 
  <input type="radio" name="temp" value="1" /> 
  <input type="radio" name="temp" value="2" /> 
  <input type="radio" name="temp" value="3" /> 
  <input type="radio" name="temp" value="4" /> 
  <input type="radio" name="temp" value="5" /> 
  Agitated
  </form>
        <Button onClick={this.lastStep}>Back</Button>
        <Button onClick={this.nextStep}>Next</Button>
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(NewDreamStep3);
  