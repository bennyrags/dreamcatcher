import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import {HashRouter as Router} from 'react-router-dom';

class NewDreamStep3 extends Component {

    state = {
        moodScore: this.props.mood
    }
    
    handleMoodChange = (event) => {
        this.setState({
            moodScore: event.target.value
        })
    }


nextStep = () => {
    this.props.dispatch({type:'ADD_MOOD_SCORE', payload: this.state.moodScore})

    this.props.history.push('/step4')
}

lastStep = () => {
    this.props.history.push('/step2')
}

componentDidMount() {
    if (this.state.moodScore !=0 || this.state.moodScore !='')  {
        let input = document.getElementsByTagName('input');
        console.log('this is input.length', input.length);
        console.log('this is this.props.mood', this.props.mood );
        for (let i=0; i < input.length; i++) {
            if (input[i].value == this.props.mood) {
                input[i].checked = true;

            }
        }
    }
}

    render() {
        return(
            <>
            <h1>How Are You Feeling?</h1>
            <h2>(mood)</h2>
<form>
  Calm 
  <input onChange={this.handleMoodChange} type="radio" name="temp" value="1" /> 
  <input onChange={this.handleMoodChange} type="radio" name="temp" value="2" /> 
  <input onChange={this.handleMoodChange} type="radio" name="temp" value="3" /> 
  <input onChange={this.handleMoodChange} type="radio" name="temp" value="4" /> 
  <input onChange={this.handleMoodChange} type="radio" name="temp" value="5" /> 
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
    mood: state.dreamAdd.dreamInfo.score_mood
  });
  
  export default connect(mapStateToProps)(NewDreamStep3);
  