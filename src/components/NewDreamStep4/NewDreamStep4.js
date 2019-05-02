import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField'
//import {HashRouter as Router} from 'react-router-dom';
import Grid from '@material-ui/core/Grid'

let updateView = ''; 


class NewDreamStep4 extends Component {

    state = {
        addThemes: {
        themeIDs: []
        }
    }

addThemes = (event) => {
//BUG - UNSELECTING BOX
//need to add an if statement to make sure the click is not UNSELECTING the checkbox. 
// if (event.target.checked !==true) {
//     console.log(`this eventTarget has been unchecked`);
//     let themeIds = this.props.themesSelected
//     //do loop to find index of number in ThemeIDs array that matches unchecked value, use that index to slice out number
//     for (let i=0; i < themeIds.length; i++ ) {
//         if (event.target.value == themeIds[i]) {
//             this.setState({
//             themeIds: themeIds.slice(i, 0)
//             })
            
//             console.log(`themeIds afte slice`, themeIds);
//         }
//     }
// }


    this.setState({
        addThemes: {
            themeIDs: [...this.state.addThemes.themeIDs, Number(event.target.value)]
        }
      
    })

}

goToAddTheme = () => {
    this.props.history.push('/theme-new')
}

nextStep = () => {
    this.props.dispatch({type:'ADD_THEMES', payload: this.state.addThemes.themeIDs})
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

// //to make sure checked themes remain checked until submit
//     if (this.state.addThemes.themeIDs !==[])  {
//         let input = document.getElementsByTagName('input');
//                for (let i=0; i < input.length; i++) {
//             if (this.props.themesSelected.includes(Number(input[i].value))) {
//                 input[i].checked = true;

//             }
//         }
//     }
}

    render() {
        console.log(this.state)

if (this.props.themes.length === 0) {
    this.updateView = 
    <section className='overFlowDiv'>
        <p>
            Looks like you don't have any themes yet for your dreams. Add a theme to get started.
        </p>
        <Button onClick={this.goToAddTheme}>Add Theme</Button>

               </section>
}
else {
    this.updateView = 
    <>
    <section className='overFlowDiv containerMiddle'>
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
               </section>
               <section className='containerBottom'></section>
               <Grid container
  direction='row'
  justify='space-evenly'
  alignItems='flex-end'
  >
  <Grid item>
  
        <Button onClick={this.lastStep}>Back</Button>
        </Grid>
        <Grid item>
        <Button onClick={this.nextStep}>Next</Button>
        </Grid>
        </Grid>
</>
    
}


console.log(`this is updateView,`, this.updateView);


        return(
            <>
            <section className='containerHeader'>
            <h1>Pick Themes</h1>
            </section>
            {this.updateView}
            
        </>
        )
    }


}

const mapStateToProps = state => ({
    user: state.user,
    themes: state.themes,
   // themesSelected: state.dreamAdd.themes

  });
  
  export default connect(mapStateToProps)(NewDreamStep4);
  