import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import moment from 'moment';
import TextField from '@material-ui/core/TextField'

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
        this.props.dispatch({ type: 'DELETE_DREAM', payload: id });
        this.props.history.push('/dreams')
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
                <h2>
                    Dream
            </h2>

                {this.props.dream.map(i =>
                    <section key={i.id} className='dreamContainer'>
                        <h3>{moment(i.date).format('L')}</h3>

                        <h4>Mood Score: {i.score_mood}</h4>
                        <h4>Temp Score: {i.score_temp}</h4>
                        <h4>Themes: {i.string_agg}</h4>
                {this.state.editedDream.editing === true ? 
                     <section>
                     <TextField
                        className='whiteOverride'
                         value={this.state.editedDream.description}
                         onChange={this.handleTextUpdate}
                         multiline
                         rows='4'
                         variant='outlined'
                     /> <br />
                     <Button onClick={this.saveDream}>Save Dream</Button>
                 </section>
                    :

                        <p>
                            {i.description}
                        </p>
                }
                        <Button onClick={() => this.editDream(i.description)}>Edit Description</Button>
                        <Button onClick={() => this.deleteDream(i.id)}>Delete</Button>
                        <Button onClick={this.goToAllDreams}>All Dreams</Button>
                    </section>
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
