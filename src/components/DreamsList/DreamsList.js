import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import {HashRouter as Router} from 'react-router-dom';
//import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid'
import moment from 'moment';
import '../App/App.css'

//import { Tab } from '@material-ui/core';

class DreamList extends Component {

    ///this will handle the click to the for going to the individual dream item.
    handleClick = (id) => {
        this.props.history.push(`/dream?id=${id}`)

    }


componentDidMount() {
    this.props.dispatch({type:'FETCH_DREAMS', payload: this.props.user.id})

}


back = () => {
    this.props.history.goBack();
}

home = () => {
    this.props.history.push('/')
}

    render() {
        return(
            <>
            <h1>Your Dreams</h1>
            <section className="overFlowDiv">
<Table>
    <TableHead>
        <TableRow>
            <TableCell>
                Date
            </TableCell>
            <TableCell>
                Description
            </TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
       {this.props.dreams.map(dream => {
        //only want the first few words to be displayed
        let dreamSentance = dream.description.split(' ');
        let firstFewWords = '';
        if (dreamSentance.length > 3) {
            for (let i=0; i < 4; i++) {
                firstFewWords += ' ' + dreamSentance[i];
            }
        }
        else {
            for (let i=0; i < dreamSentance.length; i++) {
                firstFewWords += ' ' + dreamSentance[i];
            }
           
        }

        return <TableRow onClick={()=>this.handleClick(dream.id)} key={dream.id}>
          <TableCell>{moment(dream.date).format('L')}</TableCell>  
          <TableCell>{firstFewWords}...</TableCell>  
        </TableRow>
        }
        )}
    </TableBody>
</Table>
</section>
<Grid container
  direction='row'
  justify='space-evenly'
  alignItems='flex-end'
  >
  <Grid item>
        <Button onClick={this.back}>Back</Button>
        </Grid>
        <Grid item>
        <Button onClick={this.home}>Home</Button>
        </Grid>
        </Grid>
            </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    dreams: state.dreams
  });
  
  export default connect(mapStateToProps)(DreamList);
  