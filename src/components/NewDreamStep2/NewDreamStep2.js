import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';
// import Radio from '@material-ui/core/Radio';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

class NewDreamStep2 extends Component {

nextStep = () => {
    this.props.history.push('/step3')
}
lastStep = () => {
    this.props.history.push('/step1')
}

    render() {
        return(
            <>
            <h1>How Are You Feeling?</h1>
            <h2>(temperature)</h2>
<form>
  Cold 
  <input type="radio" name="temp" value="1" /> 
  <input type="radio" name="temp" value="2" /> 
  <input type="radio" name="temp" value="3" /> 
  <input type="radio" name="temp" value="4" /> 
  <input type="radio" name="temp" value="5" /> 
  Warm
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
  
  export default connect(mapStateToProps)(NewDreamStep2);
  