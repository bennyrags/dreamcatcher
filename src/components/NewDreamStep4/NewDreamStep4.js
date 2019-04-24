import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
import {HashRouter as Router} from 'react-router-dom';

class NewDreamStep4 extends Component {

nextStep = () => {
    console.log('in nextStep');
   this.props.history.push('/submitDream')
}

lastStep = () => {
    this.props.history.push('/step3')
}

    render() {
        return(
            <>
            <h1>Pick Themes</h1>
           <ul>
               <li>Theme 1</li>
               <li>Theme 2</li>
               <li>Theme 3</li>
               <li>Theme 4</li>
               </ul>
               <Button>Add Theme</Button>

        <Button onClick={this.lastStep}>Back</Button>
        <Button onClick={this.nextStep}>Next</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(NewDreamStep4);
  