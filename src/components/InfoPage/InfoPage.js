import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Button} from '@material-ui/core'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {

state = {
  avgs: {
    mood:0,
    temp:0,
  }
}

vitalsChart = () => {
  this.props.history.push('/vitals-chart')
}
themeChart = () => {
  this.props.history.push('/theme-chart')
}


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DREAMS', payload: this.props.user.id })
    this.props.dispatch({ type: 'FETCH_THEMES', payload: this.props.user.id })
  }

  componentDidUpdate(prevProps) {
    if(this.props.dreams !== prevProps.dreams) {
      let moodTotal = 0;
      let tempTotal = 0;
      for (let dream of this.props.dreams) {
        moodTotal += dream.score_mood;
        tempTotal += dream.score_temp;
       }
       let dreamLength = this.props.dreams.length;
       let moodAvg =  moodTotal/dreamLength
       let tempAvg =  tempTotal/dreamLength

       this.setState({
         avgs: {
           mood:moodAvg.toFixed(1),
           temp: tempAvg.toFixed(1),
         }
       })
    }
  }
  
  render() {
  
 return(
  <>
  <section style={{'height': '75px'}} className='containerHeader'>
    <h1>
      {this.props.user.first_name}'s Dream Info
    </h1>
    </section>
    <section className='containerMiddle'>
    <h2>Dreams and Themes</h2>
<h4>You have {this.props.dreams.length} dreams</h4>
<h4>You have {this.props.themes.length} themes</h4>
<Button onClick={this.themeChart}>Theme Chart</Button>


<h2>Vitals</h2>
<h4>Your average temp score is {this.state.avgs.temp}</h4>
<h4>Your average mood score is {this.state.avgs.mood}</h4>
<Button onClick={this.vitalsChart}>Vitals Chart</Button>


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
);

}
}



const mapStateToProps = state => ({
  user: state.user,
  dreams: state.dreams,
  themes: state.themes
});


export default connect(mapStateToProps)(InfoPage);
