import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import './Nav.css';


class Nav extends Component {

  state = {
    drawer: {
      top: false,
      bottom: false,
      right: false,
      left: false
    }
  }

  toggleDrawer = (side, open) => {
    console.log(`this is toggleDrawer, here are side and open`, side, open);
    this.setState({
      [side]: open,
    })
  }



  render() {
    return (
      <div className="nav">
        <header>
          <Link to="/home">
            <h1 className="nav-title">HORACE THE DREAMER  </h1>
          </Link>
          <div className='menu'>
            <Button onClick={() => this.toggleDrawer('left', true)}>Menu</Button>
          </div>
        </header>
        <Drawer
          open={this.state.left}
          onClose={() => this.toggleDrawer('left', false)}
          // onOpen={() => this.toggleDrawer('left', true)}
          
        >

          <div className='navContainer'>
            <Link onClick={()=>this.toggleDrawer('left', false)}  className="nav-link" to="/home">
              {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
              {this.props.user.id ? 'Home' : 'Login / Register'}
            </Link>
            {/* Show the link to the info page and the logout button if the user is logged in */}
            {this.props.user.id && (
              <>
                <Link onClick={()=>this.toggleDrawer('left', false)} className="nav-link" to="/info">
                  Info
          </Link>
                <Link onClick={()=>this.toggleDrawer('left', false)} className="nav-link" to="/dreams">
                  Dreams
          </Link>
                <Link onClick={()=>this.toggleDrawer('left', false)} className="nav-link" to="/themes">  
                  Themes
          </Link>
                <Link onClick={() => this.props.dispatch({ type: 'LOGOUT' })} className="nav-link" to="/">
                  Log Out
          </Link>
              </>
            )}
            {/* Always show this link since the about page is not protected */}
            <Link onClick={()=>this.toggleDrawer('left', false)} className="nav-link" to="/about">
              About
      </Link>
          </div>
        </Drawer>

      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
