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

    renderReviews = () => {
        var reviews = [];
        console.log("ReviewList", this.props)
        for (let i = 0; i < this.props.reviews.length; i++) {
            console.log("Ah", this.props.reviews[i][1], this.props.review_id)
            if(this.props.reviews[i][0] === this.props.user_review_id) {
                reviews.push( 
                    <Review key={i} refreshReviews={this.props.refreshReviews} isEdittable={true} review_body={this.props.reviews[i][3]} rating={this.props.reviews[i][4]} user_id={this.state.reviews[i][1]} review_id={this.props.reviews[i][0]}/>
                )
            } else {
                reviews.push( 
                    <Review key={i} refreshReviews={this.props.refreshReviews} isEdittable={false} review_body={this.props.reviews[i][3]} rating={this.props.reviews[i][4]} user_id={this.props.reviews[i][1]} review_id={this.props.reviews[i][0]}/>
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