import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';
// import Radio from '@material-ui/core/Radio';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Grid from '@material-ui/core/Grid'

class NewDreamStep2 extends Component {

state = {
    tempScore: this.props.temp
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

componentDidMount() {
    if (this.state.tempScore !=0 || this.state.tempScore !='')  {
        let input = document.getElementsByTagName('input');
        console.log('this is input.length', input.length);
        console.log('this is this.props.temp', this.props.temp );
        for (let i=0; i < input.length; i++) {
            if (input[i].value == this.props.temp) {
                input[i].checked = true;

            }
        }
    }
}

    render() {
        console.log(`this is state in new dream step 2`, this.state);
        
        return(
            <>
            <section className='containerHeader'>
            <h1>How Are You Feeling?</h1>
            <h2>(temperature)</h2>
            </section>


<section className='containerMiddle'>
<form>
  Cold 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="1" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="2" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="3" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="4" /> 
  <input onChange={this.handleTempChange} type="radio" name="temp" value="5" /> 
  Warm
  </form>
</section>
<section className='containerBottom'>
  <Grid container
  direction='row'
  justify='space-evenly'
  alignItems='flex-end'
  >
  <Grid item>
        <Button onClick={this.lastStep}>Back</Button>
        </Grid>
        <Grid item>
        <Button onClick={this.nextStep}>Next</Button>
        </Grid>
        </Grid>
        </section>
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    temp: state.dreamAdd.dreamInfo.score_temp
  });
  
  export default connect(mapStateToProps)(NewDreamStep2);
  