import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import moment from 'moment';
class Theme extends Component {

    state = {
        editedTheme: {
            description: ''
        }
    }

getUrl = () => {
    const keySplit = window.location.hash.split('id=')
    const id = Number(keySplit[1]);
    this.props.dispatch({type:'FETCH_THEME', payload: id});
}

goToAllThemes = () => {
    this.props.history.push('/themes');
}

deleteDream = () => {
    console.log(`inside deleteDream`);
}


componentDidMount() {
    this.getUrl();
    
}

    render() {
        return (
            <>
            <h2>
Theme           
 </h2>
           
                {this.props.theme.map(i => 
            <section key={i.id} className='dreamContainer'>                
           <h3>{i.theme_name}</h3>
           <h3>Created Date: {moment(i.theme_created_date).format('L')}</h3>
              <p>
                    {i.theme_description}
                </p>

                <Button>Edit Theme</Button>
                <Button onClick={()=> this.deleteDream}>Delete</Button>
                <Button onClick={this.goToAllThemes}>All Themes</Button>
                </section>    
                )
                
            }
            
        </>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme,
});
  
  export default connect(mapStateToProps)(Theme);
  