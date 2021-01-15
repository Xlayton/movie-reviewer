import React from 'react'

export default class Homepage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: '',
            password: '',
            review: '',
            rating: 0,
            movie: '',
            renderReview: false
        }

        this.authenticateUser = this.authenticateUser.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleReview = this.handleReview.bind(this);
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/550?api_key=77c34d76c76368a57135c21fcb3db278')
        .then(res => res.json())
        .then(data => {
            this.setState({
                movie: data
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
        this.setState({review: evt.target.value});
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
                this.setState({
                    renderReview: true
                })
            }
        })
    }

    postReview = () => {
        //TODO
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

    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <br/>
                <br/>
                <img style={{width: 200, height: "auto"}} src={`https://image.tmdb.org/t/p/w500/${this.state.movie.poster_path}`}></img>
                <h2>{this.state.movie.original_title}</h2>
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