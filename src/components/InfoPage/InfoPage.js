import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class InfoPage extends Component {


  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DREAMS', payload: this.props.user.id })
    this.props.dispatch({ type: 'FETCH_THEMES', payload: this.props.user.id })
  }


  render() {
  
 return(
  <>
  <section className='containerHeader'>
    <h1>
      {this.props.user.first_name}'s Dream Info Page
    </h1>
    </section>
    <section className='containerMiddle'>
    <h2>Dreams and Themes</h2>
<h3>You have {this.props.dreams.length} dreams</h3>
<button>See Dreams</button>
<h3>You have {this.props.themes.length} themes</h3>
<button>See Themes</button>

<h2>Vitals</h2>
<h3>Your average temp score is </h3>
<h3>Your average mood score is </h3>


</section>

<section className='containerBottom'>
bottom
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
