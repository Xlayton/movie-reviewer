<template>
  <div class="MovieView">
    <img
      v-bind:src="'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path"
      v-bind:alt="this.movie"
    />
    <h2>{{ this.movie.original_title }}</h2>
    <ReviewList
      :editReview="editReview"
      :handleRating="handleRating"
      :handleReview="handleReview"
      :reviews="reviews"
      :user_review_id="user_review_id"
      :refreshReviews="refreshReviews"
      :movie_id="id"
    />
  </div>
</template>

<script>
import ReviewList from "./ReviewList";
export default {
  name: "movieview",
  props: ["id", "user_id"],
  components: { ReviewList },
  data() {
    return {
      movie: {},
      userHasReview: false,
      user_review_id: "",
      reviews: [],
    };
  },
  created() {
    fetch(
      `https://api.themoviedb.org/3/movie/${this.id}?api_key=77c34d76c76368a57135c21fcb3db278`
    )
      .then((res) => res.json())
      .then((data) => {
        this.movie = data
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
            console.log(data)
            this.reviews = data;
          }
          // this.getAverageScore();
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
        let temp_reviews = [...this.reviews];
        let review = temp_reviews[i];
        review[3] = evt.target.value
        this.reviews = temp_reviews;
    }
  },
};
</script>

<style scoped>
img {
  width: 200px;
  height: auto;
}
</style>