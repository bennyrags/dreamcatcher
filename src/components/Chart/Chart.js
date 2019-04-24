import React, { Component } from "react";
import {Line} from 'react-chartjs-2';
import moment from 'moment';


/*
THIS IS CODE FROM SPIKE! - 4-24-2019

Objective: get dynamic info into chart.js chart. 
This was mostly accomplished. First I created an array of objects similar to one I might expect from a get req to the database. That is represented in the chartInfo const below
*/

const chartInfo = [
    {
        date: '11/20/18',
        mood: 2,
        temp: 3
    },
    {
        date: '11/23/18',
        mood: 5,
        temp: 2
    },
    {
        date: '11/24/18',
        mood: 1,
        temp: 3
    },
    {
        date: '11/25/18',
        mood: 4,
        temp: 1
    },
    {
        date: '11/26/18',
        mood: 2,
        temp: 5
    },
    {
        date: '11/29/18',
        mood: 3,
        temp: 4
    },
    {
        date: '12/02/18',
        mood: 1,
        temp: 4
    }
];

class Chart extends Component {

//The state is the setup for a chartJs using the example from https://github.com/jerairrest/react-chartjs-2

state = {
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
//This doesnt work and I'm not sure why. It seems to follow the examples Ive seen, but the font size / color doesn't change
options: { 
    scales: {
        xAxis: [{
            ticks: {
            fontColor:'green',
            fontSize:10
            
        }
        }]
    
    }

}
}//end state

//update the chart by taking in info from an array of objs that is meant to mimic a resp from server
updateChart = () => {
    let mood = [];
    let temp = [];
    let dates = [];
    //loop through array, and put these three things in separate arrays for chart

    for (let i of chartInfo) {
        mood.push(i.mood);
        temp.push(i.temp);
        //use moment.js to make date more readable
        dates.push(moment(i.date).format('ll'));
    }   
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


componentDidMount() {
    this.updateChart();
}

render() {
    console.log('this is state after set state', this.state);

    return(
        <div className='chartJs'>
            <h2>Hello from ChartJs! </h2>
        {/* The chart is below. The issue with this way is that there is little way to change a single canvas element. Whereas in d3, you can change particular parts of the svg */}
            <Line data={this.state.data}  />
        </div>
    )
}

}

export default Chart;