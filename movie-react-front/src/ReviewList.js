import React from 'react';
import Review from './Review';
//Requires movie id through props
export default class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            user_review_id: undefined,
            userHasReview: false
        }
    }

    refreshReviews = () => {
        fetch(`http://localhost:8080/api/reviews/?movie_id=${this.props.movie_id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(review => {
                console.log(review, this.state.user_id)
                if(this.state.user_id === review[1]) {
                    this.setState({userHasReview: true, user_review_id: review[0]})
                }
            })
            this.setState({
                reviews: data
            })
        })
    }

    componentDidMount() {
        console.log(this.props.movie_id)
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movie_id}?api_key=77c34d76c76368a57135c21fcb3db278`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movie: data,
            })
        })

        this.refreshReviews()
    }

    renderReviews = () => {
        var reviews = [];

        for (let i = 0; i < this.state.reviews.length; i++) {
            console.log("Ah", this.state.reviews[i][1], this.state.review_id)
            if(this.state.reviews[i][0] === this.state.user_review_id) {
                reviews.push( 
                    <Review key={i} isEdittable={true} review_body={this.state.reviews[i][3]} rating={this.state.reviews[i][4]} user_id={this.state.reviews[i][1]} review_id={this.state.reviews[i][0]}/>
                )
            } else {
                reviews.push( 
                    <Review key={i} isEdittable={false} review_body={this.state.reviews[i][3]} rating={this.state.reviews[i][4]} user_id={this.state.reviews[i][1]} review_id={this.state.reviews[i][0]}/>
                )
            }
        }

        return reviews;
    }
    
    render() {
        return (
            <>
                {this.renderReviews()}
            </>
        )
    }
}