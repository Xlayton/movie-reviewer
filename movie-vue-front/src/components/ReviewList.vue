<template>
  <div class="review-list">
    <div
      class="review-container"
      v-for="(review, index) in reviews"
      v-bind:key="review.id"
    >
      <button
        v-if="isAdmin"
        v-on:click="
          () => {
            handleDelete(reviews[index][0]);
          }
        "
      >
        Remove Review
      </button>
      <div class="review">
        <div v-if="should_show_poster" class="poster-container">
          <img
            v-bind:src="'https://image.tmdb.org/t/p/w500/' + movies[index]"
            class="movie-poster"
          />
        </div>
        <div class="content-container">
          <Review
            v-if="reviews && user"
            v-bind:editReview="editReview"
            v-bind:index="index"
            v-bind:handleRating="handleRating"
            v-bind:handleReview="handleReview"
            v-bind:refreshReviews="refreshReviews"
            v-bind:isEditable="reviews[index][1] === user_review_id"
            v-bind:review_body="reviews[index][3]"
            v-bind:rating="reviews[index][4]"
            v-bind:user_id="user[1]"
            v-bind:review_id="reviews[index][0]"
          />
        </div>
      </div>
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
            console.log(data);
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
          console.log(data);
        });
    },
  },
  created() {
    this.reviews.forEach((review) => this.getMoviePoster(review[2]));
    fetch(`http://localhost:8080/api/users?user_id=${this.user_review_id}`)
      .then((res) => res.json())
      .then((data) => (this.user = data[0]));
  },
  watch: {
    reviews: function (reviews) {
      reviews.forEach((review) => this.getMoviePoster(review[2]));
    },
  },
};
</script>

<style>
.review {
  display: flex;
  width: 75%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 1vh 0;
}
.review-container:nth-child(even) > .review {
  flex-direction: row-reverse;
}

.review-container:nth-child(odd) > .review > .content-container {
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.review-container:nth-child(even) > .review > .content-container {
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
}

.review-container:nth-child(even) > .review > .content-container > .review-data > .edit-button {
  top: 0;
  right: 0;
}
.review-container:nth-child(odd) > .review > .content-container > .review-data > .edit-button {
  top: 0;
  left: 0;
}

.review-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.content-container {
  flex-grow: 2;
  
  background-color: #5f5f5f;
  height: 90%;
}

.review-data {
 display: flex;
  align-items: center;
  flex-direction: column;
}

.edit-button {
  position: absolute;
  display: none;
}
.edit-button.hovered {
  display: block;
}

.content-container {
  position: relative;
}
</style>