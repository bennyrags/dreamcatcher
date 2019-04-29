import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import moment from 'moment';
class Dream extends Component {

    state = {
        editedDream: {
            id: 0,
            editing: false,
            description: '',
            
        }
    }

    getUrl = () => {
        const keySplit = window.location.hash.split('=')
        const id = Number(keySplit[1]);
        this.props.dispatch({ type: 'FETCH_DREAM', payload: id });
    }

    goToAllDreams = () => {
        this.props.history.push('/dreams');
    }

    deleteDream = (id) => {
        this.props.dispatch({ type: 'DELETE_DREAM', payload: id });
        this.props.history.push('/dreams')
    }


    componentDidMount() {
        this.getUrl();

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
                        
                        <p>
                            {i.description}
                        </p>

                        <Button onClick={this.editDream}>Edit Description</Button>
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
