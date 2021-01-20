import React from 'react'
import ReviewStars from './components/ReviewStars'
import MovieView from './MovieView';

//Will probably end up being our spa "root"
export default class Movie extends React.Component {
    constructor(props){
        super(props);
        console.log("Movie", props)
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="content">
                {/* TODO: Put stars on ratings */}
                <ReviewStars score = {0} editable={false}/>
                <br/>
                <br/>
                <MovieView movie_id={this.props.location.movieID} user_id={this.props.location.user_id}/>
            </div>
        )
    }
}