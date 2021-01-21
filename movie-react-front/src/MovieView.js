import React from 'react';
import CreateReview from './CreateReview';
import ReviewList from './ReviewList';
import ReviewStars from './components/ReviewStars'


export default class MovieView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
            reviews: [],
            user_review_id: undefined,
            userHasReview: false,
            averageScore:0,
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

    handleReview = (evt, i) => {
        let temp_reviews = [...this.state.reviews];
        let review = temp_reviews[i];
        review[3] = evt.target.value
        this.setState({ reviews: temp_reviews });
    }

    handleRating = (evt, i) => {
        // console.log(evt,i)
        let temp_reviews = [...this.state.reviews];
        let review = temp_reviews[i];
        review[4]= evt;
        console.log("New Score" ,review[4]);
        this.setState({ reviews: temp_reviews });
    }

    editReview = (index) => {
        let body = new URLSearchParams({
            review_id: this.state.reviews[index][0],
            review_body: this.state.reviews[index][3],
            rating: this.state.reviews[index][4]
        });
        
        console.log(body.toString())
        fetch('http://localhost:8080/api/reviews', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            this.refreshReviews();
        })
        .catch(console.log)
    }

    refreshReviews = () => {
        fetch(`http://localhost:8080/api/reviews/?movie_id=${this.props.movie_id}`)
        .then(res => res.json())
        .then(data => {
            if(Array.isArray(data)) {
            data.forEach(review => {
                if(parseInt(this.props.user_id) === review[1]) {
                    this.setState({userHasReview: true, user_review_id: review[1]})
                }
            })
            this.setState({
                reviews: data
            });
        }
        this.getAverageScore();
        })
    }
    
    getAverageScore(){
        let total = 0;
        this.state.reviews.forEach(review => {
            total+=review[4];
            console.log("Total", total)
        });
        let average = (total/this.state.reviews.length);
        console.log("Average", average)
        this.setState({
            averageScore: average
        });
        // return average;
    }


    render() {
        return (
            <>
                <img style={{width: 200, height: "auto"}} src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`} alt={this.state.movie}></img>
                <h2>{this.state.movie.original_title}</h2>
                {/* TODO Average score for movies */}
                <ReviewStars score={this.state.averageScore} editable={false} key={this.state.averageScore}/>
                <CreateReview refreshReviews={this.refreshReviews} movie_id={this.props.movie_id} user_id={this.props.user_id}/>
                <ReviewList editReview={this.editReview} handleRating={this.handleRating} handleReview={this.handleReview} reviews={this.state.reviews} user_review_id={this.state.user_review_id} refreshReviews={this.refreshReviews} movie_id={this.props.movie_id}/>
            </>
        )
    }
}