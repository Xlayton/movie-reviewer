import React from 'react'
import ReviewStars from './components/ReviewStars'
import MovieView from './MovieView';

//Will probably end up being our spa "root"
export default class Homepage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            movie_id: 550,
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                {/* TODO: Put stars on ratings */}
                <ReviewStars score = {0} editable={true}/>
                <ReviewStars score = {3} editable={false}/>
                <br/>
                <br/>
                <MovieView movie_id={this.state.movie_id}/>
            </div>
        )
    }
}