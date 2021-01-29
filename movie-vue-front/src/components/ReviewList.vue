<template>
  <div class="ReviewList">
    <div class="review-container" v-for="(review, index) in reviews" v-bind:key="review.id">
       <button v-if="isAdmin" v-on:click="() => this.handleDelete(reviews[index][0])">Remove Review</button>
       <Review v-bind:editReview="editReview" v-bind:index="index" v-bind:handleRating="handleRating" v-bind:handleReview="handleReview" v-bind:refreshReviews="refreshReviews" v-bind:isEditable="reviews[index][1] === user_review_id" v-bind:review_body="reviews[index][3]" v-bind:rating="reviews[index][4]" v-bind:user_id="reviews[index][1]" v-bind:review_id="reviews[index][0]"/>
    </div>
  </div>
</template>

<script>
import Review from "./Review.vue"
export default {
  name: "reviewlist",
  components: {Review},
  props: [
    "editReview",
    "handleRating",
    "handleReview",
    "reviews",
    "user_review_id",
    "refreshReviews",
    "movie_id",
  ],
  data() {
    return {
      isAdmin: window.sessionStorage.getItem("isAdmin") === "1",
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
  },
};
</script>

<style>
</style>