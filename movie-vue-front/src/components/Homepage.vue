<template>
  <div class="content">
    <br/>
    <br/>
    <div class="searchBar">
      <div class="row">
        <button id="title" class="selected black button" v-on:click="selectTitle">Title</button>
        <button id="person" class="black button" v-on:click="selectPerson">Person</button>
      </div>
      <br/>
      <label>Genre: </label>
      <GenreSelectionDropdown :onGenreChange="onGenreChange" />
      <!-- <select class="selectQuery" v-model="query">
        <option value="title" selected>Title</option>
        <option value="person">Person</option>
      </select> -->
      <input v-model="searchText" class="searchInput" />
      <button class="button" v-on:click="handleSearchQuery">Search</button>
    </div>
    <br/>
    <!-- <div class="searchBar">
      <label>Genre: </label>
      <GenreSelectionDropdown :onGenreChange="onGenreChange" />
      <br />
      <br />
    </div> -->
    <div class="MovieSet">
      <div class="movie" v-for="movie in moviesFirstHalf" :key="movie.id">
        <router-link v-bind:to="'/movie?id=' + movie.id + '&user_id=' + user_id">
          <img
            v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            v-bind:alt="{ movie }"
          />
        </router-link>
        <h3 class="title">{{ movie.original_title }}</h3>
        <p class="release">Released On: {{ movie.release_date }}</p>
      </div>
    </div>
    <div v-if="renderSecondHalf" class="MovieSet">
      <div class="movie" v-for="movie in moviesSecondHalf" :key="movie.id">
        <router-link v-bind:to="'/movie?id=' + movie.id + '&user_id=' + user_id">
          <img
            v-bind:src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            v-bind:alt="{ movie }"
          />
        </router-link>
        <h3 class="title">{{ movie.original_title }}</h3>
        <p class="release">Released On: {{ movie.release_date }}</p>
      </div>
    </div>
    <br />
    <br />
    <div class="center">
      <button id="showMore" class="button large" v-on:click="showAllMovies">Show More</button>
    </div>
    <br />
    <br />
    <div class="row separate">
      <button class="black button" v-on:click="decrementPage">Previous</button>
      <button id="next" class="black button" v-on:click="incrementPage">Next</button>
    </div>
  </div>
</template>

<script>
import GenreSelectionDropdown from "./GenreSelectionDropdown.vue";
export default {
  name: "homepage",
  data() {
    return {
      moviesFirstHalf: [],
      moviesSecondHalf:[],
      searchText: "",
      query: "title",
      user_id: "",
      renderSecondHalf: false
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
            if(data.results.length > 10){
              var half = data.results.length / 2; 
              this.moviesFirstHalf = data.results.splice(0, half);
              this.moviesSecondHalf = data.results.splice(-half);
            } else {
              this.moviesFirstHalf = data.results;
            }
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
            this.moviesFirstHalf = data.results[0].known_for;
            document.getElementById('showMore').style.display = "none";
            this.moviesSecondHalf = [];
          });
      }
    },
    onGenreChange(evt) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${evt.target.value}`
      )
      .then((res) => res.json())
      .then((data) => {
        var half = data.results.length / 2; 
        this.moviesFirstHalf = data.results.splice(0, half);
        this.moviesSecondHalf = data.results.splice(-half);
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
      document.getElementById('title').classList.add("selected");
      document.getElementById('person').classList.remove("selected");
    },
    selectPerson() {
      this.query = "person";
      document.getElementById('person').classList.add("selected");
      document.getElementById('title').classList.remove("selected");
    },
    showAllMovies(){
      this.renderSecondHalf = true;
      document.getElementById('showMore').style.display = "none";
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
      var half = data.results.length / 2; 
      this.moviesFirstHalf = data.results.splice(0, half);
      this.moviesSecondHalf = data.results.splice(-half);
      console.log(this.moviesFirstHalf);
    });
  },
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

input {
  width: 50%;
  height: 20px;
}

.searchInput {

  margin-left: 10px;
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

.center {
  text-align: center;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0px 15%;
}

.separate {
  justify-content: space-between;
}

.MovieSet {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px 10%;
}

.movie {
  border: solid;
  text-align: center;
  border-color: #333;
  border-radius: 8px;
  padding: 10px 20px 42px 20px;
  margin: 10px;
  width: 225px;
  height: 415px;
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

.title {
  font-weight: bold;
  margin: 15px 0px;
  font-size: 15pt;
}

.release {
  color: #333;
  font-size: 10pt;
}

.button {
  color: rgb(0, 162, 255);
  background-color: #fff;
  border: solid 3px;
  border-color: rgb(0, 162, 255);
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 14px;
}

.button:hover {
  background-color: rgb(0, 162, 255);
  color: #eee;
  cursor: pointer;
}

.large {
  padding: 15px 30px;
  border-radius: 2px;
  font-size: 18px;
  text-transform: uppercase;
}

.black{
  color: rgb(41, 41, 41);
  background-color: #fff;
  border: solid 3px;
  border-color: rgb(41, 41, 41);
  padding: 5px 10px;
  font-size: 12pt;
}

.black:hover {
  background-color: rgb(41, 41, 41);
  color: #eee;
  cursor: pointer;
}

.selected {
  background-color: rgb(41, 41, 41);
  color: #eee;
}

#title {
  padding: 5px 20px;
  margin-left: 15px;
}

#next {
  padding: 5px 20px;
}
</style>
