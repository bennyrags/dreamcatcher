import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'

class ThemeChart extends Component {

state = {
    data: {
        labels: [

        ],
        datasets: [{
            data: [],
            // backgroundColor: [
            // '#FF6384',
            // '#36A2EB',
            // '#FFCE56'
            // ],
            // hoverBackgroundColor: [
            // '#FF6384',
            // '#36A2EB',
            // '#FFCE56'
            // ]
        }]
    }
}


goToInfo = () => {
    this.props.history.push('/info')
}


componentDidMount() {
    this.props.dispatch({ type: 'FETCH_THEMES', payload: this.props.user.id })
}

componentDidUpdate(prevProps) {
    if(this.props.dreams !== prevProps.dreams) {
        let labels = [];
        let data = [];
        
    }
}

render() {
   
    return (
        
            <>
            <section className='containerHeader'>
            <h1>Theme Chart</h1>
            </section>
            <section className='containerMiddle'>
            
            </section>
            
            
            <section className='containerBottom'>
            <Button onClick={this.goToInfo}>Your Info</Button>

            </section>
            
            
            
            </>
    )


}


}





const mapStateToProps = state => ({
    user: state.user,
    dreams: state.dreams
  });
  

export default connect(mapStateToProps)(ThemeChart);