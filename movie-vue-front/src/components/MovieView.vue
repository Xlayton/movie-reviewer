<template>
  <div class="movie-view">
    <img
      v-bind:src="'https://image.tmdb.org/t/p/w500/' + this.movie.backdrop_path"
      v-bind:alt="this.movie"
      class="movie-back"
    />
    <div class="gradient-back" />
    <div class="movie-view-content">
      <div class="movie-header">
        <img
          v-bind:src="
            'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path
          "
          v-bind:alt="this.movie"
          class="movie-image"
        />
        <div class="movie-header-content">
        <div class="overview-container">
          <p class="movie-title">{{ this.movie.original_title }}</p>
          <ReviewStars v-bind:score="averageScore" :size="50" />
          <h3 class='overview-title'>Overview: </h3>
          <p class="overview-text">{{this.movie.overview}}</p>
        </div>
          <CreateReview
            v-if="user_id && !userHasReview"
            v-bind:refreshReviews="refreshReviews"
            v-bind:movie_id="id"
            v-bind:user_id="user_id"
          />
          <ReviewList
            v-bind:editReview="editReview"
            v-bind:handleRating="handleRating"
            v-bind:handleReview="handleReview"
            v-bind:reviews="reviews"
            v-bind:user_review_id="user_review_id"
            v-bind:refreshReviews="refreshReviews"
            v-bind:movie_id="id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateReview from "./CreateReview.vue";
import ReviewList from "./ReviewList";
import ReviewStars from "./ReviewStars.vue";
export default {
  name: "movieview",
  props: ["id"],
  components: { ReviewList, ReviewStars, CreateReview },
  data() {
    return {
      movie: {},
      userHasReview: false,
      user_review_id: "",
      reviews: [],
      averageScore: 0,
      user_id: undefined,
    };
  },
  created() {
    this.user_id = window.sessionStorage.getItem("userID");
    fetch(
      `https://api.themoviedb.org/3/movie/${this.id}?api_key=77c34d76c76368a57135c21fcb3db278`
    )
      .then((res) => res.json())
      .then((data) => {
        this.movie = data;
        // console.log(this.movie)
      });
    this.refreshReviews();
  },
  methods: {
    refreshReviews() {
      fetch(`http://localhost:8080/api/reviews/?movie_id=${this.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            data.forEach((review) => {
              if (parseInt(this.user_id) === review[1]) {
                this.userHasReview = true;
                this.user_review_id = review[1];
              }
            });
            console.log(data);
            this.reviews = data;
          }
          this.getAverageScore();
        });
    },
    editReview(index) {
      let body = new URLSearchParams({
        review_id: this.reviews[index][0],
        review_body: this.reviews[index][3],
        rating: this.reviews[index][4],
      });

      console.log(body.toString());
      fetch("http://localhost:8080/api/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.refreshReviews();
        })
        .catch(console.log);
    },
    handleRating(evt, i) {
      let temp_reviews = [...this.reviews];
      let review = temp_reviews[i];
      review[4] = evt;
      console.log("New Score", review[4]);
      this.reviews = temp_reviews;
    },
    handleReview(evt, i) {
      console.log(evt.target.value, i);
      let temp_reviews = [...this.reviews];
      let review = temp_reviews[i];
      review[3] = evt.target.value;
      this.reviews = temp_reviews;
    },
    getAverageScore() {
      let total = 0;
      this.reviews.forEach((review) => {
        total += review[4];
        console.log("Total", total);
      });
      let average = total / this.reviews.length;
      console.log("Average", average);
      this.averageScore = average;
    },
  },
};
</script>

<style scoped>
.movie-back {
  width: 100%;
  position: fixed;
  z-index: -2;
  top: 0;
  filter: blur(3px);
}
.gradient-back{
  width: 100%;
  height: 100vh;
  z-index: -1;
  top: 0;
  position: fixed;
  background-color: white;
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255, 255, 255, 0) 100%);
}
.movie-view-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
}
.movie-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.movie-header-content {
  width: 70%;
  min-height: 700px;
  padding: 0 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-top-right-radius: 7px;
  padding: 1%;
}
.movie-image {
  max-height: 70vh;
}
.movie-title {
  font-size: 3em;
  /* color: white; */
  /* width: 100%; */
  text-align: center;
}

.blur {
  filter: blur(3px);
}

.overview-container {
  background-color: rgba(215,215,215,0.5);
  border-radius: 5px;
  padding: 5px;
}

.overview-title {
  font-size: 2em;
}
.overview-text {
  font-size: 1em;
}

@media screen and (max-width: 850px) {
  .movie-image {
    max-height: 45vh;
  }
  .gradient-back{
      background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 70%, rgba(255, 255, 255, 0) 100%);
  }
}
@media screen and (max-width: 700px) {
  .movie-view-content {
    margin-top: 45%;
  }
  .movie-header {
    margin: -40% 0 5% 0;
  }
  /* .movie-image {
    max-height: 40vh;
  } */
  .overview-title {
    font-size: 1.5em;
  }
}
.review-data {
  border-radius: 5px;
}
</style>