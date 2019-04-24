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

class DreamList extends Component {

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
            <h1>Your Dreams</h1>
<Table>
    <TableHead>
        <TableRow>
            <TableCell>
                MM/DD/YY
            </TableCell>
            <TableCell>
                Description
            </TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow>
            <TableCell>
                04/19/2019
            </TableCell>
            <TableCell>
            Lorem ipsum dolor sit amet...
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
                04/23/2019
            </TableCell>
            <TableCell>
            Lorem ipsum dolor sit amet...
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell>
                04/24/2019
            </TableCell>
            <TableCell>
            Lorem ipsum dolor sit amet...
            </TableCell>
        </TableRow>
    </TableBody>
</Table>
        <Button onClick={this.lastStep}>Back</Button>
        <Button onClick={this.nextStep}>Save</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(DreamList);
  