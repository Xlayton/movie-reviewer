import React from 'react';
import ReviewStars from './components/ReviewStars';

//Needs user and movie IDs through props
export default class CreateReview extends React.Component {
    constructor(props) {
        super(props);
        console.log("Create Review", props)
        this.state = {
            rating: '',
            review_body: ''
        }
    }
    handleReview = evt => {
        this.setState({review_body: evt.target.value});
    }

    handleRating = evt => {
        this.setState({rating: evt});
        // console.log(evt)
    }

    componentDidMount() {
    }

    postReview = () => {
        let body = new URLSearchParams({
            user_id: this.props.user_id,
            movie_id: this.props.movie_id,
            review_body: this.state.review_body,
            rating: this.state.rating
        });
        console.log(body.toString())
        //TODO - Page should display all current reviews for the movie 
        // - User can update their current review for the movie 
        // console.log(this.props.user_id, this.props.movie_id,)
        fetch('http://localhost:8080/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body
          })
        .then(res => res.json())
        .then(data => {
            if(data){
                console.log(data);
                this.props.refreshReviews();
            }
        })

    }
    
    render() {
        return (
            <>
                <div>
                    <label>Rating: </label>
                    <ReviewStars score={this.props.rating} editable={true} onScoreChange={this.handleRating}/>                       
                    <br/>
                    <br/>
                    <label>Review: </label>
                    <textarea rows="10" cols="100" value={this.state.review} onChange={this.handleReview} />
                    <br/>
                    <br/>
                    <button onClick={this.postReview}>Submit</button>
                </div>
            </>
        )
    }
}