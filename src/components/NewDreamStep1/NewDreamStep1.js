import React, { Component } from 'react';
//import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
class NewDreamStep1 extends Component {



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
        <Button>Back</Button>
        <Button>Next</Button>
        </>
        )
    }


}

export default NewDreamStep1;