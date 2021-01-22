import React from 'react';
import Review from './Review';
//Requires movie id through props
export default class ReviewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_review_id: undefined,
            userHasReview: false
        }
    }

    componentDidMount() {
        this.props.refreshReviews()
    }

    handleReview = (evt, i) => {
        this.props.handleReview(evt, i)
    }

    handleRating = (evt, i) => {
        this.props.handleRating(evt, i)
    }

    renderReviews = () => {
        var reviews = [];
        for (let i = 0; i < this.props.reviews.length; i++) {
            console.log(this.props.reviews[i][1], this.props.user_review_id)
            if(this.props.reviews[i][1] === this.props.user_review_id) {
                if(this.props.movie_posters) {
                    reviews.push( 
                        <Review movie_poster={this.props.movie_posters[i]} key={i} editReview={this.props.editReview} index={i} handleRating={this.handleRating} handleReview={this.handleReview} refreshReviews={this.props.refreshReviews} isEditable={true} review_body={this.props.reviews[i][3]} rating={this.props.reviews[i][4]} user_id={this.props.reviews[i][1]} review_id={this.props.reviews[i][0]}/>
                    )
                } else {
                    reviews.push( 
                        <Review key={i} editReview={this.props.editReview} index={i} handleRating={this.handleRating} handleReview={this.handleReview} refreshReviews={this.props.refreshReviews} isEditable={true} review_body={this.props.reviews[i][3]} rating={this.props.reviews[i][4]} user_id={this.props.reviews[i][1]} review_id={this.props.reviews[i][0]}/>
                    )
                }
            } else {
                if(this.props.movie_posters) {
                    reviews.push( 
                        <Review movie_poster={this.props.movie_posters[i]} key={i} editReview={this.props.editReview} index={i} handleRating={this.handleRating} handleReview={this.handleReview} refreshReviews={this.props.refreshReviews} isEditable={false} review_body={this.props.reviews[i][3]} rating={this.props.reviews[i][4]} user_id={this.props.reviews[i][1]} review_id={this.props.reviews[i][0]}/>
                    )
                } else {
                    reviews.push( 
                        <Review key={i} editReview={this.props.editReview} index={i} handleRating={this.handleRating} handleReview={this.handleReview} refreshReviews={this.props.refreshReviews} isEditable={false} review_body={this.props.reviews[i][3]} rating={this.props.reviews[i][4]} user_id={this.props.reviews[i][1]} review_id={this.props.reviews[i][0]}/>
                    )
                }
            }
        }
        return reviews;
    }
    
    render() {
        return (
            <>
            {/* <h1>ReviewList</h1> */}
                {this.renderReviews()}
            </>
        )
    }
}