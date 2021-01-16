import React from 'react';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
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
    
    render() {
        return (
            <>
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
            </>
        )
    }
}