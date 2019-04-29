import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Button from '@material-ui/core/Button'
import moment from 'moment';
//import {HashRouter as Router} from 'react-router-dom';
// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
import axios from 'axios';
import ThemeAddNew from '../ThemeAddNew/ThemeAddNew';


class UserPage extends Component {
  
  state = { 
    helloConditionals: {
      lastDream: '',
      todaysDate: '',
      timeOfDay:'',
      dreamEntered: false
    }
  }
  

  handleTimeOfDay = () => {
    let MomentTime = moment().format('HH:mm');
    let SplitTime = MomentTime.split(':');
    let time = Number(SplitTime[0]);

    if (time > 0 && time < 12) {
      this.setState({
        helloConditionals: {
          ...this.state.helloConditionals,
          timeOfDay: 'morning'
        }
      })
    }


    if (time >=12 && time < 17) {
      this.setState({
        helloConditionals: {
          ...this.state.helloConditionals,
          timeOfDay: 'afternoon'
        }
      })
    }
    if (time >=17 && time < 24) {
      this.setState({
        helloConditionals: {
          ...this.state.helloConditionals,
          timeOfDay: 'evening'
        }
      })
    }

   
}



handleDreamsEntered = () => {
  let id = this.props.user.id;
  console.log(`this is id in handleDreamsEternered`, id);
  let date = '';
axios({
url: `/api/dreams/${id}`,
method:'GET'
})
.then(response => {
  console.log(`this is response from axios req on userPage`,response.data);
  date = response.data[0].date;
  let momentDate = moment(date).format('YYYY-MM-DD');
  console.log(`this is momentDate in response`, momentDate)
  this.setState({
    helloConditionals: {
      ...this.state.helloConditionals,
      lastDream: momentDate,
      todaysDate: moment().format('YYYY-MM-DD')
    }

  })
})
.catch(error =>{
  alert(`There was an issue getting the most recent dreams. Please try again later`);
})
}

  newDream = () => {
   this.props.history.push('/dreams'); 
  }

  goToDreams = () => {
    this.props.history.push('/themes')
  }


  componentDidMount() {
    //need to fetch dreams to see when last dream was completed
    //with that information, I need to get the date
    //with the date, i need to figure out if there has been a dream submitted today.
    //then create the conditional render

    //console.log(this.props.dreams)
  //  this.props.dispatch({type:'FETCH_DREAMS', payload: this.props.user.id})
  
  this.handleDreamsEntered(); 
    this.handleTimeOfDay();
  }


  render() {
    console.log(`this is state in RENDER`, this.state)

 return( <div>
  <h1 id="welcome">
   Good {this.state.helloConditionals.timeOfDay},{this.props.user.first_name }
  </h1>
  <h2>Today is {moment().format('dddd')}, {moment().format('MMMM Do YYYY')}</h2>
{this.state.helloConditionals.lastDream === this.state.helloConditionals.todaysDate ?
<section className='newDreamButtons'>
<h3>
Looks like you've already entered a dream for today. 
</h3>  
<Button onClick={this.newDream} className='mainButton'>
See Dreams
  </Button>
 
  <Button onClick={this.goToDreams} className='mainButton'>
See Themes
  </Button>

  </section> 
  :
  <section className='newDreamButtons'>
  <Button onClick={this.newDream} className='mainButton'>
    Add new Dream
  </Button>
 
  <Button onClick={this.goToDreams} className='mainButton'>
See Dreams
  </Button>
  </section>
 
}
</div>
)
}
}




// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
