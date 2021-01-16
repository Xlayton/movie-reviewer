import React from 'react'
import ReviewStars from './components/ReviewStars'
import MovieView from './MovieView';

export default class Homepage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            password: '',
            review_body: '',
            rating: 0,
            movie: '',
            user_id: '',
            movie_id: '',
            reviews: '',
            renderReview: false,
            userHasReview: false,
            review_id: undefined,
            enableEdit: false
        }

        this.authenticateUser = this.authenticateUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleReview = this.handleReview.bind(this);
    }

    componentDidMount() {

        fetch(`http://localhost:8080/api/reviews/?movie_id=${this.state.movie_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(review => {
                if(this.state.user_id === review[1]) {
                    this.setState({userHasReview: true, review_id: review[0]})
                }
            })
            this.setState({
                reviews: data
            })
        })
    }

    handleEmail = evt => {
        this.setState({email: evt.target.value});
    }

    handlePassword = evt => {
        this.setState({password: evt.target.value});
    }

    handleRating = evt => {
        this.setState({rating: evt.target.value});
    }

    handleReview = evt => {
        this.setState({review_body: evt.target.value});
    }

    authenticateUser = () => {
        console.log('authenticating......')
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                email: this.state.email,
                password: this.state.password
            })
          })
        .then(res => res.json())
        .then(data => {
            if(data){
                console.log(data);
                this.refreshReviews()
                this.setState({
                    renderReview: true,
                    user_id: data.userId
                })
            }
        })
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
                user_id: this.state.user_id,
                movie_id: this.state.movie_id,
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

    enableEdit = () => {
        this.setState({enableEdit: true})
    }

    editReview = () => {
        if(this.state.userHasReview && this.state.review_id) {
        fetch('http://localhost:8080/api/reviews', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
                review_id: this.state.review_id,
                review_body: this.state.review_body,
                rating: this.state.rating
            })
        }).then(res => res.json())
        .then(data => {
            this.setState({enableEdit: false});
            this.refreshReviews();
        })
        .catch(console.log)
    }
    }

    renderRatingReview = () => {
        if(this.state.renderReview){
            return (
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
            )
        } else {
            return (
                <>
                </>
            )
        }
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
                <MovieView movie_id={550}/>
            </div>
        )
    }
}