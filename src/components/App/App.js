import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
//import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../StyleThemes/themes';
import NewDreamStep1 from '../NewDreamStep1/NewDreamStep1';
import NewDreamStep2 from '../NewDreamStep2/NewDreamStep2'
import NewDreamStep3 from '../NewDreamStep3/NewDreamStep3'
import NewDreamStep4 from '../NewDreamStep4/NewDreamStep4'
import DreamsList from '../DreamsList/DreamsList'
import ThemesList from '../ThemesList/ThemesList'
import SubmitDream from '../SubmitDream/SubmitDream'
import Dream from '../Dream/Dream'

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
<MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />

        <div className='container'>

          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/step1"
              component={NewDreamStep1}
            />
            <ProtectedRoute
              exact
              path="/step2"
              component={NewDreamStep2}
            />
            <ProtectedRoute
              exact
              path="/step3"
              component={NewDreamStep3}
            />
            <ProtectedRoute
              exact
              path="/step4"
              component={NewDreamStep4}
            />
            <ProtectedRoute
              exact
              path="/dreams"
              component={DreamsList}
            />
            <ProtectedRoute
              exact
              path="/themes"
              component={ThemesList}
            />
            <ProtectedRoute
              exact
              path="/submitDream"
              component={SubmitDream}
            />


            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          </div>
        </div>
      </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);
