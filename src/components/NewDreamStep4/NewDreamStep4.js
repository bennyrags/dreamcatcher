import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';

class NewDreamStep4 extends Component {

    state = {
        addThemes: {
        themeIDs: []
        }
    }

addThemes = (event) => {
    //how to add themes into an array w/o replacing each time I enter a value
    //iterate rather?
    this.setState({
        addThemes: {
            themeIDs: [...this.state.addThemes.themeIDs, event.target.value]
        }
      
    })
}

goToAddTheme = () => {
    this.props.history.push('/theme-new')
}

nextStep = () => {
    console.log('in nextStep');
   this.props.history.push('/submitDream')
}

lastStep = () => {
    this.props.history.push('/step3')
}

getThemes = () => {
    this.props.dispatch({type:'FETCH_THEMES', payload:this.props.user.id})

}

componentDidMount() {
this.getThemes();
}

    render() {
        console.log(this.state)

        return(
            <>
            <h1>Pick Themes</h1>
          
          <form>
           <ul>
            {this.props.themes.map(theme=> 
               <li key={theme.id}>
               <input onChange={this.addThemes} type='checkbox' value={theme.id}/>{theme.theme_name}
               </li>
            
                )}
               </ul>

               </form>
               <Button onClick={this.goToAddTheme}>Add Theme</Button>

        <Button onClick={this.lastStep}>Back</Button>
        <Button onClick={this.nextStep}>Next</Button>

        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    themes: state.themes,
  });
  
  export default connect(mapStateToProps)(NewDreamStep4);
  