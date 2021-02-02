<template>
  <div class="content">
    <br/>
    <br/>
    <div class="searchBar">
      <!-- <button v-on:click="selectTitle">Title</button>
      <button v-on:click="selectPerson">Person</button> -->
      <br/>
      <select class="selectQuery" v-model="query">
        <option value="title" selected>Title</option>
        <option value="person">Person</option>
      </select>
      <input v-model="searchText" class="searchInput" />
      <button v-on:click="handleSearchQuery">Search</button>
    </div>
    <div class="searchBar">
      <label>Genre: </label>
      <GenreSelectionDropdown :onGenreChange="onGenreChange" />
      <br />
      <br />
    </div>
    <div class="MovieSet">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <router-link v-bind:to="'/movie?id=' + movie.id + '&user_id=' + user_id">
          <img
            v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            v-bind:alt="{ movie }"
          />
        </router-link>
        <h2>{{ movie.original_title }}</h2>
      </div>
    </div>
    <br />
    <br />
    <br />
    <div class="row">
      <button v-on:click="decrementPage">Previous Page</button>
      <button v-on:click="incrementPage">Next Page</button>
    </div>
  </div>
</template>

<script>
import GenreSelectionDropdown from "./GenreSelectionDropdown.vue";
export default {
  name: "homepage",
  data() {
    return {
      movies: [],
      searchText: "",
      query: "title",
      user_id: ""
    };
  },
  components: { GenreSelectionDropdown },
  methods: {
    handleSearchQuery() {
      if (this.query === "title") {
        var titleString = this.searchText;
        titleString.replace(" ", "%20");
        titleString.trim();
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&query=${titleString}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.movies = data.results;
          });
      } else if (this.query === "person") {
        var personString = this.searchText;
        personString.replace(" ", "%20");
        personString.trim();
        fetch(
          `https://api.themoviedb.org/3/search/person?api_key=77c34d76c76368a57135c21fcb3db278&query=${personString}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.movies = data.results[0].known_for;
          });
      }
    },
    onGenreChange(evt) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${evt.target.value}`
      )
        .then((res) => res.json())
        .then((data) => (this.movies = data.results));
    },
  },
  created() {
    if (!window.sessionStorage.getItem("pageNumber")) {
      window.sessionStorage.setItem("pageNumber", 1);
    }
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&page=${window.sessionStorage.getItem(
        "pageNumber"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.movies = data.results;
        console.log(this.movies);
      });
  },
  incrementPage() {
    var pageNumber = window.sessionStorage.getItem("pageNumber"); 
    pageNumber++;
    window.sessionStorage.setItem("pageNumber", pageNumber);
    this.refreshPage();
  },
  decrementPage() {
    var pageNumber = window.sessionStorage.getItem("pageNumber"); 
    if(pageNumber > 1){
      pageNumber--;
      window.sessionStorage.setItem("pageNumber", pageNumber);
    }
    this.refreshPage();
  },  
  refreshPage() {
    window.location.reload(false);
  },
  selectTitle() {
    this.query = "title";
  },
  selectPerson() {
    this.query = "person";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap');

img {
  width: 100%;
  height: auto;
}

.searchBar {
  text-align: center;
}

.searchInput {
  width: 60%;
  margin-right: 10px;
  margin-bottom: 2%;
}

.selectQuery {
  margin-right: 10px;
}

/* CONTENT */
.content {
  margin: 10px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.MovieSet {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.movie {
  border: solid;
  text-align: center;
  border-color: #333;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 10px;
  width: 250px;
  height: 420px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Merriweather', serif;
  color: #333;
}

.movie:hover {
  background-color: rgb(221, 221, 221);
  cursor: pointer;
}
</style>
