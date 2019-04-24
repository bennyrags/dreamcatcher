import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import {HashRouter as Router} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Tab } from '@material-ui/core';
import './ThemeList.css'
class ThemeList extends Component {

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
            <h1>Your Themes</h1>

            <ul>
            <li>
                <h3>Theme Name 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
            </li>
            <li>
                <h3>Theme Name 2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
            </li>
            <li>
                <h3>Theme Name 3</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
            </li>
            </ul>


        <Button onClick={this.lastStep}>Back</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(ThemeList);
  