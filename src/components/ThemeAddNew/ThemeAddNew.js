import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';

class ThemeAddNew extends Component {
  
 state = {
   newTheme: {
     theme_name: '',
     theme_description:'',
     theme_creation_date: new Date(),
     user_id: this.props.user.id,
   }
 }

 updateNewTheme = event => {
console.log(`event target name:`, event.target.name);
console.log(`event target value:`, event.target.value);

  this.setState({
    newTheme: {
  ...this.state.newTheme,
  [event.target.name]: event.target.value
}
})
 }//end updateNewTheme

    addNewTheme = () => {
//        console.log(`in saveTheme`);
//need to make sure fields aren't blank
if (this.state.newTheme.theme_name.length === 0 || this.state.newTheme.theme_description.length === 0 ) {
  alert('Please fill out both fields before submitting.')
  return;
}   

//need to push this new theme to the server
        //need to redirect to the step 4 with this theme chosen
        this.props.dispatch({type:'ADD_NEW_THEME', payload: this.state.newTheme})
        //i use go back b/c i can get to this page from different places. i want it to go back to wherever it comes from, not a particular page.
        this.props.history.goBack();
    }//end saveTheme

    render() {
      console.log(`this is state in render`, this.state);
      
        return(
            <>
            <h1>Add New Theme</h1>
          <label>Theme Name</label>
            <input
          label="Theme Title"
          className='input'
          type='text'
          name='theme_name'
          onChange={this.updateNewTheme}
          value={this.state.newTheme.theme_name}
        />
        <label>Theme Description</label>
            <textarea
          label="Theme Description"
          className='textField'
          rows='5'
          name='theme_description'
          value={this.state.newTheme.theme_description}
          onChange={this.updateNewTheme}
          ></textarea>
        <Button onClick={this.addNewTheme}>Save Theme</Button>
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(ThemeAddNew);
  