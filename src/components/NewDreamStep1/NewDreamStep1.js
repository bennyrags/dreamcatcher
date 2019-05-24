import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';

class NewDreamStep1 extends Component {

  state = {
    newDream: {
      description: this.props.description,
      id: this.props.user.id,
    }
  }

  horraceDream = () => {
    this.setState({
      newDream: {
        ...this.state.newDream,
        description: 'chased all over the bronx botanical garden by a giant, pulsing canoli'
      }
    })
  }

  handleTextChange = (event) => {
    this.setState({
      newDream: {
        ...this.state.newDream,
        description: event.target.value
      }
    })
  }

  saveDreamDescription = () => {
    this.props.dispatch({ type: 'ADD_DREAM_DESCRIPTION', payload: this.state.newDream })
  }

  nextStep = () => {
    this.saveDreamDescription();
    this.props.history.push('/step2')
  }

  render() {

    return (
      <>
        <button onClick={this.horraceDream} className='horrace'></button>
        <section className='containerHeader'>
          <h1>New Dream</h1>
        </section>
        <section className='containerMiddle'>
          <label>Enter Dream Description Below</label>
          <textarea
            className='textField'
            rows='5'
            onChange={this.handleTextChange}
            margin="normal"
            value={this.state.newDream.description}

          ></textarea>
        </section>
        <section className='containerBottom'>

          <Button onClick={this.nextStep}>Next</Button>
        </section>

      </>
    )
  }


}

const mapStateToProps = state => ({
  user: state.user,
  description: state.dreamAdd.dreamInfo.description
});

export default connect(mapStateToProps)(NewDreamStep1);
