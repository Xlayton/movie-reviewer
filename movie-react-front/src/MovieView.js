import React from 'react';
import ReviewList from './ReviewList';

export default class MovieView extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            movie: '',
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movie_id}?api_key=77c34d76c76368a57135c21fcb3db278`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movie: data,
            })
        })
    }
    
    render() {
        return (
            <>
                <img style={{width: 200, height: "auto"}} src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt={this.state.movie}></img>
                <h2>{this.state.movie.original_title}</h2>
                <ReviewList movie_id={this.props.movie_id}/>
            </>
        )
    }
}