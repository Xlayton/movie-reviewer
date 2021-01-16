import React from 'react';

//Needs user and movie IDs through props
export default class CreateReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: '',
            review_body: ''
        }
    }
    handleReview = evt => {
        this.setState({review_body: evt.target.value});
    }

    handleRating = evt => {
        this.setState({rating: evt.target.value});
    }

    componentDidMount() {
    }

    postReview = () => {
        //TODO - Page should display all current reviews for the movie 
        // - User can update their current review for the movie 
        fetch('http://localhost:8080/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                user_id: this.props.user_id,
                movie_id: this.props.movie_id,
                review_body: this.state.review_body,
                rating: this.state.rating
            })
          })
        .then(res => res.json())
        .then(data => {
            if(data){
                console.log(data);
            }
        })

        this.refreshReviews();
    }
    
    render() {
        return (
            <>
                <div>
                    <label>Rating: </label>
                    <select value={this.state.rating} onChange={this.handleRating}>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>                       
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