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
            backgroundColor: [],
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

randomColorGenerator = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

updateState = (themesLabels, themesData, themesBackground) => {
    console.log(`this is themesLabels in updateSTate`, themesLabels);
    console.log(`this is themesData in updateSTate`, themesData);
    
    this.setState({
        data: {
        ...this.state.data,
        labels: themesLabels,
        datasets: [{
        ...this.state.data.datasets,
            data: themesData,
            backgroundColor: themesBackground
        }]
    }
    })
console.log(`this is state in themeChart updateState funct`, this.state)
}

componentDidMount() {
    this.props.dispatch({ type: 'FETCH_THEME_COUNT', payload: this.props.user.id })
   
}

componentDidUpdate(prevProps) {
    if(this.props.themes !== prevProps.themes) {
        let themesLabels = [];
        let themesData = [];
        let themesBackground = [];

        for (let theme of this.props.themes) {
            themesLabels.push(theme.theme_name);
            themesData.push(Number(theme.count));
            themesBackground.push(`#${this.randomColorGenerator()}`);
        }
        console.log(`themesLabels in themeChart:`, themesLabels);
        console.log(`themesData in themeChart:`, themesData);
        console.log(`themesBackground in themeChart:`, themesBackground);
        
        this.updateState(themesLabels,themesData,themesBackground);
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
            <Doughnut data={this.state.data} 
             options= {{
                legend: {
                    position:'bottom',
                    labels: {
                        fontColor: 'white'
                    }
                    
                },
                maintainAspectRatio: false,
            }}
            
            />

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
    themes: state.themeCountReducer
  });
  

export default connect(mapStateToProps)(ThemeChart);