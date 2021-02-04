<template>
  <div class="review-list">
    <div
      class="review-container"
      v-for="(review, index) in reviews"
      v-bind:key="review.id"
    >
      <div
      class="button delete-button"
        v-if="isAdmin"
        v-on:click="
          () => {
            handleDelete(reviews[index][0]);
          }
        "
      >
        ✖
      </div>
      <img v-if="should_show_poster" class="poster" v-bind:src="'https://image.tmdb.org/t/p/w500/' + movies[index]" />
      <Review
        v-bind:editReview="editReview"
        v-bind:index="index"
        v-bind:handleRating="handleRating"
        v-bind:handleReview="handleReview"
        v-bind:refreshReviews="refreshReviews"
        v-bind:isEditable="reviews[index][1] === user_review_id"
        v-bind:review_body="reviews[index][3]"
        v-bind:rating="reviews[index][4]"
        v-bind:user_id="reviews[index][1]"
        v-bind:review_id="reviews[index][0]"
      />
    </div>
  </div>
</template>

<script>
import Review from "./Review.vue";
export default {
  name: "reviewlist",
  components: { Review },
  props: [
    "editReview",
    "handleRating",
    "handleReview",
    "reviews",
    "user_review_id",
    "refreshReviews",
    "movie_id",
    "should_show_poster",
  ],
  data() {
    return {
      isAdmin: window.sessionStorage.getItem("isAdmin") === "1",
      user: undefined,
      movies: [],
    };
  },
  methods: {
    handleDelete(id) {
      console.log(id);
      fetch("http://localhost:8080/api/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
          review_id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            this.refreshReviews();
          }
        });
    },
    getMoviePoster(id) {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=77c34d76c76368a57135c21fcb3db278`
      )
        .then((res) => res.json())
        .then((data) => {
          this.movies.push(data.poster_path);
        });
    },
  },
  created() {
    console.log(this.movies)
    this.reviews.forEach((review) => this.getMoviePoster(review[2]));
  },
  watch: {
    reviews: function (reviews) {
      reviews.forEach((review) => this.getMoviePoster(review[2]));
    },
  },
};
</script>

<style scoped>

.review-container .poster {
  width: 25%;
}

.movie-poster {
  flex-grow: 1;
  height: 100%;
  border: 0.5px solid #000;
  border-radius: 5px;
}
.poster-container {
  position: relative;
  height: 250px;
}

.review-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

}

.content-container {
  flex-grow: 2;

  background-color: #5f5f5f;
  height: 90%;
}

.content-container {
  position: relative;
}
.review-list {
  width: 70%;
  margin: 10% 0;
}


.button {
  /* min-width:120px; */
  color: rgb(0, 0, 0);
  background-color: #fff;
  border: solid 3px;
  border-color: rgb(255, 0, 0);
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 14px;
}

.button:hover {
  background-color: rgb(255, 0, 0);
  color: #eee;
  cursor: pointer;
}

</style>