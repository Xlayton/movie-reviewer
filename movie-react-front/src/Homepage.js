import React from 'react'

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

    async componentDidMount() {
        await fetch('https://api.themoviedb.org/3/movie/550?api_key=77c34d76c76368a57135c21fcb3db278')
        .then(res => res.json())
        .then(data => {
            this.setState({
                movie: data,
                movie_id: data.id
            })
        })

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

    refreshReviews = () => {
        fetch(`http://localhost:8080/api/reviews/?movie_id=${this.state.movie_id}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(review => {
                console.log(review, this.state.user_id)
                if(this.state.user_id === review[1]) {
                    this.setState({userHasReview: true, review_id: review[0], review_body: review[3], rating: review[4]})
                }
            })
            this.setState({
                reviews: data
            })
        })
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
                        <option value="4">5 Stars</option>
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

    renderReviews = () => {
        var reviews = [];

        for (let i = 0; i < this.state.reviews.length; i++) {
            console.log("Ah", this.state.reviews[i][1], this.state.review_id)
            if(this.state.reviews[i][0] === this.state.review_id) {
                reviews.push( 
                    <>
                    <button onClick={this.enableEdit}>Edit Review</button>
                    {this.state.enableEdit ? this.state.user_id : <p>User ID: {this.state.reviews[i][1]}</p>}

                    {this.state.enableEdit ? <select value={this.state.rating} onChange={this.handleRating}>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="4">5 Stars</option>
                    </select>          : <p>Rating: {this.state.reviews[i][4]}</p>}
                    
                    {this.state.enableEdit ? <textarea rows="10" cols="100" value={this.state.review_body} onChange={this.handleReview} /> : <p>Review: {this.state.reviews[i][3]}</p>}
                    <button onClick={this.editReview}>Submit</button>
                    </>
                )
            } else {
                reviews.push( 
                    <>
                    <p>User ID: {this.state.reviews[i][1]}</p>
                    <p>Rating: {this.state.reviews[i][4]}</p>
                    <p>Review: {this.state.reviews[i][3]}</p>
                    </>
                )
            }
        }

        return reviews;
    }

    render() {
        var reviews = this.renderReviews();

        return (
            <div>
                <h1>Homepage</h1>
                <br/>
                <br/>
                <img style={{width: 200, height: "auto"}} src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`}></img>
                <h2>{this.state.movie.original_title}</h2>
                <br/>
                <br/>
                <h3>Ratings and Reviews</h3>
                <hr/>
                {reviews}
                <br/>
                <p>john.preston@tbeatty.com</p>
                <p>ImwH@qxz56t9</p>
                <label>Email: </label>
                <input type="text" value={this.state.email} onChange={this.handleEmail} />
                <br/>
                <br/>
                <label>Password: </label>
                <input type="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <br/>
                {/* <input type="submit" value="Submit"/> */}
                <button onClick={this.authenticateUser}>Submit</button>
                <br/>
                <br/>
                {this.renderRatingReview()}
            </div>
        )
    }
}