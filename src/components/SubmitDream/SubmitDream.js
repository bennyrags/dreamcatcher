import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import {HashRouter as Router} from 'react-router-dom';

class NewDreamStep4 extends Component {

nextStep = () => {
    console.log('in nextStep');
   // this.props.history.push('/step5')
}

lastStep = () => {
    this.props.history.push('/step4')
}

    render() {
        return(
            <>
            <h1>Submit Your Dream</h1>
           <p>
               Your dream is ready to be saved. Upon saving, you will be brought to the dreams list page
           </p>

        <Button onClick={this.lastStep}>Back</Button>
        <Button onClick={this.nextStep}>Save</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(NewDreamStep4);
  