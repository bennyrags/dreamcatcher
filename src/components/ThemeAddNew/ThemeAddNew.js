import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import {HashRouter as Router} from 'react-router-dom';

class ThemeAddNew extends Component {

    saveTheme = () => {
        console.log(`in saveTheme`);
        //need to push this new theme to the server
        //need to redirect to the step 4 with this theme chosen
        
    }

    render() {
        return(
            <>
            <h1>Add New Dream</h1>
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
        <Button onClick={this.saveTheme}>Save Theme</Button>
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(ThemeAddNew);
  