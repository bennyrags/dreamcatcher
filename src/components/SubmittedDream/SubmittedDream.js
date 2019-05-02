import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import {HashRouter as Router} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
class SubmittedDream extends Component {

home = () => {
    console.log('in saveDream');
    this.props.history.push('/')
}

dreamList = () => {
    this.props.history.push('/dreams')
}

    render() {
        return(
            <>
            <div className='containerHeader'>
                        <h1>Thank You For Submitting Your Dream</h1>
                        </div>
            <div className='containerMiddle'>
           <p>
               Your dream has been saved. 
           </p>
           </div>
           <div className='containerBottom'>
           <Grid container
  direction='row'
  justify='space-evenly'
  alignItems='flex-end'
  >
           <Grid item>
           <Button onClick={this.home}>Home</Button>
        </Grid>
        <Grid item>
        <Button onClick={this.dreamList}>See Dreams</Button>
        </Grid>
        </Grid>
        
        </div>
       
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    newDream: state.dreamAdd
  });
  
  export default connect(mapStateToProps)(SubmittedDream);
  