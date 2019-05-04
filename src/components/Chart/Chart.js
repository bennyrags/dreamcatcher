import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import './Chart.css'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
/*
THIS IS CODE FROM SPIKE! - 4-24-2019

Objective: get dynamic info into chart.js chart. 
This was mostly accomplished. First I created an array of objects similar to one I might expect from a get req to the database. That is represented in the chartInfo const below
*/

// const chartInfo = [
//     {
//         date: '11/20/18',
//         mood: 2,
//         temp: 3
//     },
//     {
//         date: '11/23/18',
//         mood: 5,
//         temp: 2
//     },
//     {
//         date: '11/24/18',
//         mood: 1,
//         temp: 3
//     },
//     {
//         date: '11/25/18',
//         mood: 4,
//         temp: 1
//     },
//     {
//         date: '11/26/18',
//         mood: 2,
//         temp: 5
//     },
//     {
//         date: '11/29/18',
//         mood: 3,
//         temp: 4
//     },
//     {
//         date: '12/02/18',
//         mood: 1,
//         temp: 4
//     }
// ];

class Chart extends Component {

//The state is the setup for a chartJs using the example from https://github.com/jerairrest/react-chartjs-2

state = {
    dreams: [],
    data: {
        labels: [],
    datasets: [
      {
        label: 'Temp',
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
       fontSize:8,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      },
      {
        label: 'Mood',
        lineTension: 0.1,
         backgroundColor: 'rgba(192,75,75,0.4)',
        borderColor: 'rgba(192,75,75,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(192,75,75,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(192,75,75,1)',
        pointHoverBorderColor: 'rgba(192,75,75,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0]
      },
      
    ],
  
},

}//end state

//update the chart by taking in info from an array of objs that is meant to mimic a resp from server
updateChart = () => {
    console.log(`this is this.state.dreams`, this.state.dreams);
    
    let mood = [];
    let temp = [];
    let dates = [];
    //loop through array, and put these three things in separate arrays for chart
   // console.log(`this.props.dreams in updateChart`, this.props.dreams);
    for (let i of this.state.dreams) {
        mood.push(i.score_mood);
        temp.push(i.score_temp);
        //use moment.js to make date more readable
        dates.push(moment(i.date).format('ll'));
    }   
    console.log(`this is mood, temp and dates arrs in the updateChart funct,`)
    //this calls a funct that takes the new arrays as arguments
    this.addStuffToState(mood,temp,dates);
    
}//end updateChartMood
 
//this funct adds these new arrays to state to populate chart
addStuffToState = (mood,temp,dates) => {
   
    this.setState({
   //spreads keep everything but the thing I'm changing constant
        data: {
            ...this.state.data,
            labels: dates,
            datasets: [
                {
                    ...this.state.data.datasets[0],
                    data:temp
                },
                {
                    ...this.state.data.datasets[1],
                    data:mood
                }
            ]
        }
    })

}

goHome = () => {
    this.props.history.push('/')
}


componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DREAMS', payload: this.props.user.id })
   
    
}

componentDidUpdate(prevProps) {
    if(this.props.dreams !== prevProps.dreams) {
    let mood = [];
    let temp = [];
    let dates = [];
    //loop through array, and put these three things in separate arrays for chart
    for (let i of this.props.dreams) {
// console.log(`props dreams in component did  update`, this.props.dreams)
        mood.push(i.score_mood);
        temp.push(i.score_temp);
        //use moment.js to make date more readable
        dates.push(moment(i.date).format('ll'));
    }   
    //console.log(`this is mood, temp and dates arrs in the updateChart funct,`)
    //this calls a funct that takes the new arrays as arguments
    this.addStuffToState(mood,temp,dates);
    }
}


render() {
   
    return(
        
            <>
            <section className='containerHeader'>
            <h1>Mood / Temp Chart</h1>
            </section>
            <section className='containerMiddle'>
            <div className='chartDiv'>
        
            <Line data={this.state.data}  
            
             options= {{
                legend: {
                    display:true,
                    position:'bottom',
                    labels: {
                        fontColor: 'white'
                    }
                    
                },
                maintainAspectRatio: false,
                scales: {
                    gridLines: {
                      display:false
                    },
                    yAxes: [{
                        fontSize: 3,
                    fontColor:'white',
                    ticks: {
                        min:0,
                        max:5,
                        stepSize:1,
                        fontColor:'#fff'           
                    }
                    }],
                    
                    xAxes: [{
                        display:false
                    }]
                }  
            }}
            />
            </div>

            </section>
            <section className='containerBottom'>
            <Grid container
direction='row'
justify='space-evenly'

>
    <Grid item>
            <Button onClick={this.goHome}>Home</Button>

    </Grid>
    </Grid>
            </section>
        </>
    )
}

}

const mapStateToProps = state => ({
    user: state.user,
    dreams: state.dreams
  });
  

export default connect(mapStateToProps)(Chart);