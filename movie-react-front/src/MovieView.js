import React from 'react';
import CreateReview from './CreateReview';
import ReviewList from './ReviewList';

export default class MovieView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            reviews: [],
            user_review_id: undefined,
            userHasReview: false
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

    refreshReviews = () => {
        fetch(`http://localhost:8080/api/reviews/?movie_id=${this.props.movie_id}`)
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data)) {
            data.forEach(review => {
                console.log(review, this.state.user_id)
                if(this.state.user_id === review[1]) {
                    this.setState({userHasReview: true, user_review_id: review[0]})
                }
            })
            this.setState({
                reviews: data
            });
        }
        })
    }
    
    render() {
        return (
            <>
                <img style={{width: 200, height: "auto"}} src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt={this.state.movie}></img>
                <h2>{this.state.movie.original_title}</h2>
                <CreateReview refreshReviews={this.refreshReviews} movie_id={this.props.movie_id} user_id={this.props.user_id}/>
                <ReviewList reviews={this.state.reviews} user_review_id={this.state.user_review_id} refreshReviews={this.refreshReviews} movie_id={this.props.movie_id}/>
            </>
        )
    }
}