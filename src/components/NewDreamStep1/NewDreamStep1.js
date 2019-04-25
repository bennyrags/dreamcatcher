import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';

class NewDreamStep1 extends Component {

nextStep = () => {
    this.props.history.push('/step2')
}

    render() {
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

        //   value={this.state.multiline}
        //   onChange={this.handleChange('multiline')}
        //   className={classes.textField}
          margin="normal"
          
        />
        <Button onClick={this.nextStep}>Next</Button>
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(NewDreamStep1);
  