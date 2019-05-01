import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
//import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import { Tab } from '@material-ui/core';
import '../App/App.css'
import Grid from '@material-ui/core/Grid'

let updateView = '';

class ThemeList extends Component {
    
    back = () => {
        this.props.history.goBack();
    }
    
    home = () => {
        this.props.history.push('/')
    }

getThemes = () => {
    console.log(`in getThemes`);
    this.props.dispatch({type:'FETCH_THEMES', payload:this.props.user.id})
}

goToTheme = (id) => {
    console.log(`in goToTheme, here is id`, id);
    this.props.history.push(`/theme?id=${id}`)
}

goToAddTheme = () => {
    this.props.history.push('/theme-new')
}


componentDidMount() {
    this.getThemes();
}


    render() {
if (this.props.themes.length === 0) {
    this.updateView = 
    <>
    <section className='containerMiddle'>
    <p>
        You don't have any themes currently. Add one by clicking on the button below.
    </p>
            <Button onClick={this.goToAddTheme}>Add Theme</Button>
    </section>
    </>
}
else {
    this.updateView = 
    <>
    <section className='overFlowDiv containerMiddle'>
    <ul>
    {this.props.themes.map(theme=>
        <li onClick={()=>this.goToTheme(theme.id)} key={theme.id}>
        <h3>{theme.theme_name}</h3>
        <p>{theme.theme_description}</p>
        </li>
        )}
        
    </ul>
</section>
<section className='containerBottom'>
<Grid container
direction='row'
justify='space-evenly'
alignItems='flex-end'
>
<Grid item>
<Button onClick={this.back}>Back</Button>
</Grid>
<Grid item>
<Button onClick={this.home}>Home</Button>
</Grid>
</Grid>
</section>
</>
}

        return(
            <>
            <div className='containerHeader'>
            <h1>Your Themes</h1>
            </div>
            {this.updateView}
        </>
        )
    }

}
const mapStateToProps = state => ({
    user: state.user,
    themes: state.themes
  });
  
  export default connect(mapStateToProps)(ThemeList);
  