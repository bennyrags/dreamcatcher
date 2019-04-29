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
import moment from 'moment';
import '../App/App.css'

//import { Tab } from '@material-ui/core';

class DreamList extends Component {

    ///this will handle the click to the for going to the individual dream item.
    handleClick = (id) => {
        console.log('this is the click for dream, here is id', id);
        this.props.history.push(`/dream?id=${id}`)

    }


componentDidMount() {
    this.props.dispatch({type:'FETCH_DREAMS', payload: this.props.user.id})

}

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
            <section class="overFlowDiv">
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
        
        let dreamSentance = dream.description.split(' ');
        let firstFewWords = '';
            for (let i=0; i < 4; i++) {
                firstFewWords += ' ' + dreamSentance[i];
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
        <Button onClick={this.lastStep}>Back</Button>
        <Button onClick={this.nextStep}>Save</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    dreams: state.dreams
  });
  
  export default connect(mapStateToProps)(DreamList);
  