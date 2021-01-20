import React from "react";

export default class GenreSelectionDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: []
        }
    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US`)
        .then(res => res.json())
        .then(data => this.setState({genres: data.genres}))
    }

    render() {
        return (
            <select onChange={this.props.onGenreChange}>
                {this.state.genres.map(genre => <option value={genre.id}>{genre.name}</option>)}
            </select>

        )
    }
}