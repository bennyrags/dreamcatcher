import React from 'react';
import { connect } from 'react-redux';

function registerAlert(props) {
//console.log(`this props error registraiton message`, this.props.errors.registrationMessage)
console.log(`this props error registraiton message`, props.errors)
    return (
    <h2
    className="alert"
    role="alert"
    >
        {props.errors.registrationMessage}
    </h2>
)
}


const mapStateToProps = state => ({
    errors: state.errors,
  });
  
  export default connect(mapStateToProps)(registerAlert);
  