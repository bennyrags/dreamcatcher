import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Theme extends Component {

    state = {
        editedTheme: {
            id: 0,
            editing: false,
            description: this.props.theme.description
        }
    }

    getUrl = () => {
        const keySplit = window.location.hash.split('id=')
        const id = Number(keySplit[1]);
        this.props.dispatch({ type: 'FETCH_THEME', payload: id });
        this.setState({
            editedTheme: {
                ...this.state.editedTheme,
                id: id
            }
        })
    }

    goToAllThemes = () => {
        this.props.history.push('/themes');
    }

    deleteTheme = (id) => {
        if (window.confirm('Are you sure you want to delete this?')) {
            // console.log(`inside deleteTheme, here is id`, id);
            this.props.dispatch({ type: 'DELETE_THEME', payload: id });
            this.props.history.push('/themes')
        }
    }

    editTheme = (description) => {
        this.setState({
            editedTheme: {
                ...this.state.editedTheme,
                editing: true,
                description: description

            }
        })
    }

    handleTextUpdate = (event) => {
        this.setState({
            editedTheme: {
                ...this.state.editedTheme,
                description: event.target.value
            }
        })
    }

    saveTheme = () => {

        this.props.dispatch({ type: 'UPDATE_THEME', payload: this.state.editedTheme });
        this.setState({
            editedTheme: {
                ...this.state.editedTheme,
                editing: false
            }
        })
    }


    componentDidMount() {
        this.getUrl();

    }

    render() {
        console.log(`this is state as theme is being edited...`, this.state)
        return (
            <>
                <section className='containerHeader'>

                <h1>
                    Theme
 </h1>

</section>


                {this.props.theme.map(i =>
                    <section key={i.id} className='dreamContainer '>
                        <h3>{i.theme_name}</h3>
                        <h3>Created Date: {moment(i.theme_created_date).format('L')}</h3>

                        {this.state.editedTheme.editing === true
                            ?
                            <section>
                                <TextField
                                    value={this.state.editedTheme.description}
                                    onChange={this.handleTextUpdate}
                                    multiline
                                    rows='4'
                                    variant='outlined'
                                /> <br />
                                <Button onClick={this.saveTheme}>Save Theme</Button>
                            </section>
                            :
                            <>
                                <p> {i.theme_description}</p>
                                <Button onClick={() => this.editTheme(i.theme_description)}>Edit Theme Description</Button>
                                <section className='containerBottom'>
                                <Grid container
                                    direction='row'
                                    justify='space-evenly'
                                    alignItems='flex-end'>
                                    <Grid item>
                                        <Button onClick={() => this.deleteTheme(i.id)}>Delete</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={this.goToAllThemes}>All Themes</Button>
                                    </Grid>
                                </Grid>
                            </section>
                        </>
                        }

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
