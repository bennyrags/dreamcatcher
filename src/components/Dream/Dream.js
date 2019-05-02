import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import moment from 'moment';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

class Dream extends Component {

    state = {
        editedDream: {
            id: 0,
            editing: false,
            description: this.props.dream.description,
            
        }
    }

    getUrl = () => {
        const keySplit = window.location.hash.split('=')
        const id = Number(keySplit[1]);
        this.props.dispatch({ type: 'FETCH_DREAM', payload: id });
        this.setState({
            editedDream: {
                ...this.state.editedDream,
                id: id
            }
        })
        console.log(`this is in getUrl funct, here is this.state.editedDream`, this.state.editedDream);
        
    }


    goToAllDreams = () => {
        this.props.history.push('/dreams');
    }

    deleteDream = (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
        this.props.dispatch({ type: 'DELETE_DREAM', payload: id });
        this.props.history.push('/dreams')
    }
}
    editDream = (description) => {
        this.setState({
            editedDream: {
                ...this.state.editedDream,
                editing: true,
                description: description
            }
        })
    }

    handleTextUpdate = (event) => {
        this.setState({
            editedDream: {
                ...this.state.editedDream,
                description: event.target.value
            }
        })
    }
    saveDream = () => {

        this.props.dispatch({ type: 'UPDATE_DREAM', payload: this.state.editedDream });
        this.setState({
            editedDream: {
                ...this.state.editedDream,
                editing: false
            }
        })
    }





    componentDidMount() {
        this.getUrl();
        console.log(`this is this.state.editedDream,`, this.state.editedDream)
        console.log(`this is this.state.editedDream.description,`, this.state.editedDream.description)

    }

    render() {
        console.log('this is this.props.dream,', this.props.dream)
        return (
            <> 
                {this.props.dream.map(i =>
                    <div key={i.id} className='dreamContainer'>
                                            <section className='containerHeader'>

                <h1>
                    Dream, {moment(i.date).format('L')}
            </h1>

            <Grid container
            direction='row'
            justify='space-evenly'
            alignItems='flex-end'
            >
            
            <Grid item>
                        <h4>Mood Score: {i.score_mood}</h4>
                        </Grid>
                        <Grid item>
                        <h4>Temp Score: {i.score_temp}</h4>
                       </Grid>
                        </Grid>
                        <h4>Themes: {i.string_agg}</h4>
                        </section> {/* end of header section */}
                {this.state.editedDream.editing === true ? 
                     <section className='containerMiddle'>
                     <textarea
                        className='textField'
                         value={this.state.editedDream.description}
                         onChange={this.handleTextUpdate}
                         
                         rows='4'
                     > </textarea>
                     <Button onClick={this.saveDream}>Save Dream</Button>
                 </section>
                    :
                    <>
                    <section className='containerMiddle'>
                    
                        <p>
                            {i.description}
                        </p>
                   <Button onClick={() => this.editDream(i.description)}>Edit Description</Button>
                   </section>
                   
                   </>
                }
                <section className='containerBottom'>
                   <Grid container
                    direction='row'
                    justify='space-evenly'
                    alignItems='flex-end'
                   
                   >
                
                    <Grid item>
                
                    
                   <Button onClick={() => this.deleteDream(i.id)}>Delete</Button>
                   </Grid>
                   <Grid item>
                   <Button onClick={this.goToAllDreams}>All Dreams</Button>
                   </Grid>
                   </Grid>
                   </section>
                     
                    </div>
                )

                }

            </>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user,
    dream: state.dream,
});

export default connect(mapStateToProps)(Dream);
