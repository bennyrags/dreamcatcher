import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button'
import moment from 'moment';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
//import Fade from '@material-ui/core/Fade'

//let userContent = '';


class UserPage extends Component {

  state = {
    helloConditionals: {
      lastDream: '',
      todaysDate: '',
      timeOfDay: '',
      dreamEntered: false,
      noDreams: false
    }
  }

//time of day conditional to set state and determine what greeting user gets
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


    if (time >= 12 && time < 17) {
      this.setState({
        helloConditionals: {
          ...this.state.helloConditionals,
          timeOfDay: 'afternoon'
        }
      })
    }
    if (time >= 17 && time < 24) {
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
      method: 'GET'
    })
      .then(response => {
        console.log(`this is response from axios req on userPage`, response.data);
        date = response.data[0].date;
        let momentDate = moment(date).format('YYYY-MM-DD');
        console.log(`this is momentDate in response`, momentDate)
        this.setState({
          helloConditionals: {
            ...this.state.helloConditionals,
            lastDream: momentDate,
            todaysDate: moment().format('YYYY-MM-DD'),
            noDreams: false,
          }

        })
      })
      .catch(error => {
//possibly not the best way to do this, but noDreams set if the axios request gets a catch
        this.setState({
          helloConditionals: {
            ...this.state.helloConditionals,
            noDreams: true
          }
        })
        console.log(`ERROR getting stuff from DB FOR USER PAGE, here is error:`, error)

      })
  }

  newDream = () => {
    this.props.history.push('/step1');
  }

  goToDreams = () => {
    this.props.history.push('/dreams')
  }
  goToThemes = () => {
    this.props.history.push('/themes')
  }


  addUserPageClass = () => {
    let container = document.getElementsByClassName('container')[0];
  container.classList.add('containerUserPage')
  }


  componentDidMount() {
    this.handleDreamsEntered();
    this.handleTimeOfDay();
    this.addUserPageClass();
  }


  render() {

//start of conditional render. the noDreams state is set to true by catch clause in the axios get Request
    if (this.state.helloConditionals.noDreams === true) {
      this.userContent =
        <section className='containerMiddle newDreamButtons'>
          <p>
            Looks like you don't have any dreams.
</p>
          <p>
            Get started by following the Add New Dream button below.
</p>

          <Grid container
            direction='row'
            justify='space-evenly'
            alignItems='flex-end'
          >
            <Grid item>
              <Button onClick={this.newDream} className='mainButton'>
                Add new Dream
  </Button>
            </Grid>
          </Grid>
        </section>


    }

    else if (this.state.helloConditionals.noDreams === false && this.state.helloConditionals.lastDream === this.state.helloConditionals.todaysDate) {
      this.userContent =
        <>
          <p>
            Looks like you've already entered a dream for today.
</p>
          <Grid container
            direction='row'
            justify='space-evenly'
            alignItems='flex-end'
          >
            <Grid item>
              <Button onClick={this.goToDreams} className='mainButton'>
                See Dreams
</Button>
            </Grid>
            <Grid item>
              <Button onClick={this.goToThemes} className='mainButton'>
                See Themes
</Button>
            </Grid>
          </Grid>
        </>
    }

    else {
      this.userContent =
        <section className='newDreamButtons'>
          <Grid container
            direction='row'
            justify='space-evenly'
            alignItems='flex-end'
          >
            <Grid item>
              <Button onClick={this.newDream} className='mainButton'>
                New Dream
  </Button>
            </Grid>
            <Grid item>
              <Button onClick={this.goToDreams} className='mainButton'>
                See Dreams
  </Button>
            </Grid>
          </Grid>
        </section>
    }

    return (

      <div className='containerMiddle'>
        <h1 id="welcome">
          Good {this.state.helloConditionals.timeOfDay},{this.props.user.first_name}
        </h1>
        <h2>Today is {moment().format('dddd')}, {moment().format('MMMM Do YYYY')}</h2>
        {this.userContent}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserPage);
