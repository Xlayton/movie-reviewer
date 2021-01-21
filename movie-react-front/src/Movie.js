import React from 'react'
import MovieView from './MovieView';

//Will probably end up being our spa "root"
export default class Movie extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="content">
                {/* TODO: Put stars on ratings */}
                <br/>
                <br/>
                <MovieView movie_id={this.props.location.movieID} user_id={this.props.location.user_id}/>
            </div>
        )
    }
}