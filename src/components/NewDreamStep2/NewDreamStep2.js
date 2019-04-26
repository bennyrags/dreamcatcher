import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';
// import Radio from '@material-ui/core/Radio';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

class NewDreamStep2 extends Component {

state = {
    tempScore: 0
}

handleTempChange = (event) => {
    this.setState({
        tempScore: event.target.value
    })
}

nextStep = () => {
    this.props.dispatch({type:'ADD_TEMP_SCORE', payload: this.state.tempScore})
    this.props.history.push('/step3')
}
lastStep = () => {
    this.props.history.push('/step1')
}

    render() {
        console.log(`this is state in new dream step 2`, this.state);
        
        return(
            <>
            <h1>How Are You Feeling?</h1>
            <h2>(temperature)</h2>
<form>
  Cold 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="1" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="2" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="3" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="4" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="5" /> 
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
  