<template>
  <div class="create-review">
    <label>Rating: </label>
    <ReviewStars
      v-bind:score="rating"
      v-bind:enableEdit="true"
      v-bind:onScoreChange="(score) => (this.rating = score)"
      :size="50"
    />
    <br />
    <br />
    <label>Review: </label>
    <textarea
    class="create-review-text"
      rows="10"
      cols="50"
      maxlength="250"
      v-bind:value="review_body"
      v-on:change="
        (evt) => {
          this.review_body = evt.target.value;
        }
      "
    />
    <br />
    <br />
    <button v-on:click="postReview">Submit</button>
  </div>
</template>

<script>
import ReviewStars from "./ReviewStars.vue";
export default {
  components: { ReviewStars },
  name: "createreview",
  props: ["refreshReviews", "movie_id", "user_id"],
  data() {
    return {
      review_body: "",
      rating: 0,
    };
  },
  methods: {
    postReview() {
      let body = new URLSearchParams({
        user_id: this.user_id,
        movie_id: this.movie_id,
        review_body: this.review_body,
        rating: this.rating,
      });
      console.log(body.toString());
      fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
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

<style scoped>
  .create-review{
    width: 100%;
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .create-review-text{
    width: 70%;
  }


</style>