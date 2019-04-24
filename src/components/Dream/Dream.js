import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'

class Dream extends Component {
    render() {
        return (
            <>
            <h2>
Dream
            </h2>
            <section className='dreamContainer'>
                <h3>MM/DD/YYYY</h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
                <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

               <Button>Edit</Button>
               <Button>Delete</Button>
               <Button>All Dreams</Button>
 
            </section>
        </>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
  });
  
  export default connect(mapStateToProps)(Dream);
  