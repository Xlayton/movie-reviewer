<template>
  <div class="content">
    <h1>Homepage</h1>
    <div class="searchBar">
      <select
        class="selectQuery"
        v-model="query"
      >
        <option value="title" selected>Title</option>
        <option value="person">Person</option>
      </select>
      <input
        v-model="searchText"
        class="searchInput"
      />
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
        <img
          v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
          v-bind:alt="{ movie }"
        />
        <h2>{{ movie.original_title }}</h2>
      </div>
    </div>
    <br />
    <br />
    <br />
    <div class="row">
      <button onClick="{this.decrementPage}">Previous Page</button>
      <button onClick="{this.incrementPage}">Next Page</button>
    </div>
  </div>
</template>

<script>
import GenreSelectionDropdown from './GenreSelectionDropdown.vue';
export default {
  name: "homepage",
  data() {
    return {
      movies: [],
      searchText: "",
      query: "title"
    };
  },
  components: {GenreSelectionDropdown},
  methods: {
    handleSearchQuery() {
      if(this.query === "title"){
            var titleString = this.searchText;
            titleString.replace(' ', '%20');
            titleString.trim();
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&query=${titleString}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.movies = data.results
            })

        } else if(this.query === "person"){
            var personString = this.searchText;
            personString.replace(' ', '%20');
            personString.trim();
            fetch(`https://api.themoviedb.org/3/search/person?api_key=77c34d76c76368a57135c21fcb3db278&query=${personString}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.movies = data.results[0].known_for
            })
        }
    },
    onGenreChange(evt) {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${evt.target.value}`)
        .then(res => res.json())
        .then(data => this.movies = data.results)
    }
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  background-color: #eee;
  padding: 10px 20px;
  margin: 10px;
  width: 200px;
  height: 375px;
  color: #333;
}
</style>
