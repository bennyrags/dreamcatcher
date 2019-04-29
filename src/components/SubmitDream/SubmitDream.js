import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import {HashRouter as Router} from 'react-router-dom';

class SubmitDream extends Component {

saveDream = () => {
    if (this.props.dreamInfo.description==='') {
        alert('Please Go Back and Complete Dream Description!');
        return
    }

    this.props.dispatch({type:'ADD_NEW_DREAM', payload:this.props.newDream})
    this.props.history.push('/submittedDream')
}

lastStep = () => {
    this.props.history.push('/step4')
}

    render() {
        return(
            <>
            <h1>Submit Your Dream</h1>
           <p>
               Your dream is ready to be saved. Do you want to save it? 
           </p>

        <Button onClick={this.lastStep}>Back</Button>
        <Button onClick={this.saveDream}>Save</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    newDream: state.dreamAdd,
    dreamInfo: state.dreamAdd.dreamInfo
  });
  
  export default connect(mapStateToProps)(SubmitDream);
  