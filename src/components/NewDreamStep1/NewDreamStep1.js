import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';

class NewDreamStep1 extends Component {

state = {
  newDream: {
    description: this.props.description,
   id: this.props.user.id
}
}

handleTextChange = (event) => {
  this.setState({
    newDream: {
    ...this.state.newDream,
    description: event.target.value
  }
  })
}

saveDreamDescription = () => {
  this.props.dispatch({type:'ADD_DREAM_DESCRIPTION', payload:this.state.newDream})
}

nextStep = () => {
  this.saveDreamDescription();
    this.props.history.push('/step2')
}

    render() {
      console.log(`this is state inside of newDreamStep1`, this.state);
      
        return(
            <>
            <h1>New Dream</h1>
            <TextField
            id='filled-multiline-static'
          label="Enter New Dream"
          multiline
          rows='5'
          rowsMax="10"
          variant='outlined'
        onChange={this.handleTextChange}
          margin="normal"
          value={this.state.newDream.description}
          
        />
        <Button onClick={this.nextStep}>Next</Button>
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    description: state.dreamAdd.dreamInfo.description
  });
  
  export default connect(mapStateToProps)(NewDreamStep1);
  