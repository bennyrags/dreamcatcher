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
    this.props.dispatch({ type: 'FETCH_THEME_COUNT', payload: this.props.user.id })
   
}

componentDidUpdate(prevProps) {
    if(this.props.themeCountReducer !== prevProps.themeCountReducer) {
        let labels = [];
        let data = [];

        for (let theme of this.props.themeCountReducer) {
            labels.push(theme.theme_name);
        }
        console.log(`labels in themeChart:`, labels)
        //ok what am i measuring here? how many times each theme was used. where is that info? 
        //it is in the themes / dreams join table
        //SO
        //to get this information, I need to do a special query - and saga and reducer(?) that returns the theme numbers and their associated titles, and the amount of time they are used in the dreams
        //loop through both and check to see if the number of the theme equals one of the numbers in the dream?
        //no
        //it has to come from that join table
        //i think it needs to be a sql query that returns this info. 
        //query - get the names of the themes and the number of dreams they belong to. 
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