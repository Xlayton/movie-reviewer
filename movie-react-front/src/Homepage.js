import React from 'react'
import { Link } from 'react-router-dom';
import ReviewStars from './components/ReviewStars'
import GenreSelectionDropdown from './GenreSelectionDropdown';
import MovieView from './MovieView';

//Will probably end up being our spa "root"
export default class Homepage extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            movieList: '',
            query: 'title',
            searchText: '' 
        }

        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
    }

    componentDidMount() {
        //Fetch all current popular movies
        //https://api.themoviedb.org/3/movie/popular?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&page=1
        if(!window.sessionStorage.getItem("pageNumber")){
            window.sessionStorage.setItem("pageNumber", 1);
        }
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&page=${window.sessionStorage.getItem("pageNumber")}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                movieList: data.results
            })
        })
    }

    renderAllMovies = () => {
        var movieList = [];
        for (let i = 0; i < this.state.movieList.length; i++) {
            movieList.push(
                //Each link needs to have the movie id passed so it can be distinguishable when viewing it on the movie page
                <Link key={i} to={{
                    pathname: "/movie",
                    movieID: this.state.movieList[i].id,
                    user_id: this.props.userID
                }}>
                    <span>
                        <div className="movie">
                            <img style={{width: 200, height: "auto"}} src={`https://image.tmdb.org/t/p/w500/${this.state.movieList[i].poster_path}`} alt={this.state.movieList[i]}></img>
                            <h2>{this.state.movieList[i].original_title}</h2>
                        </div>                    
                    </span>
                </Link>
            )
        }

        return movieList;
    }

    refreshPage() {
        window.location.reload(false);
    }

    async incrementPage() {
        var pageNumber = window.sessionStorage.getItem("pageNumber"); 
        pageNumber++;
        window.sessionStorage.setItem("pageNumber", pageNumber);
        await this.refreshPage();
    }

    async decrementPage() {
        var pageNumber = window.sessionStorage.getItem("pageNumber"); 
        if(pageNumber > 1){
            var pageNumber = window.sessionStorage.getItem("pageNumber"); 
            pageNumber--;
            window.sessionStorage.setItem("pageNumber", pageNumber);
        }
        await this.refreshPage();
    }

    handleSearchQuery = evt => {
        this.setState({query: evt.target.value});
    }

    handleSearchText = evt => {
        this.setState({searchText: evt.target.value});
    }

    searchForMovie = () => {
        if(this.state.query == "title"){
            var titleString = this.state.searchText;
            titleString.replace(' ', '%20');
            titleString.trim();
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&query=${titleString}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    movieList: data.results
                })
            })

        } else if(this.state.query == "person"){
            var personString = this.state.searchText;
            personString.replace(' ', '%20');
            personString.trim();
            fetch(`https://api.themoviedb.org/3/search/person?api_key=77c34d76c76368a57135c21fcb3db278&query=${personString}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    movieList: data.results[0].known_for
                })
            })
        }
    }

    onGenreChange = (evt) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${evt.target.value}`)
        .then(res => res.json())
        .then(data => this.setState({
            movieList: data.results
        }))
    }


    render() {
        var movieList = this.renderAllMovies();
        return (
            <div className="content">
                <h1>Homepage</h1>
                <div className="searchBar">
                    <select className="selectQuery" value={this.state.query} onChange={this.handleSearchQuery}>
                        <option value="title">Title</option>
                        <option value="person">Person</option>
                    </select>
                    <input value={this.state.searchText} onChange={this.handleSearchText} className="searchInput"/>
                    <button onClick={this.searchForMovie}>Search</button>
                </div>
                <div className="searchBar">
                    <label>Genre: </label>
                    <GenreSelectionDropdown onGenreChange={this.onGenreChange}/>
                    <br/>
                    <br/>
                </div>
                <div className="MovieSet">
                    {movieList}
                </div>
                {/* TODO: Put stars on ratings
                <ReviewStars score = {0} editable={true}/>
                <ReviewStars score = {3} editable={false}/>
                <br/>
                <br/>
                <MovieView movie_id={this.state.movie_id}/> */}
                <br/>
                <div className="row">
                    <button onClick={this.decrementPage}>Previous Page</button>
                    <button onClick={this.incrementPage}>Next Page</button>
                </div>
            </div>
        )
    }
}