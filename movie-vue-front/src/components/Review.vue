<template>
  <div
    class="review-data"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
    <button
      v-if="isEditable && !enableEdit"
      :class="{ hovered: isHovering }"
      v-on:click="() => (this.enableEdit = true)"
      class="review-button edit-button"
    >
      Edit Review
    </button>
    <h1>{{ user }}</h1>
    <ReviewStars
      v-bind:score="rating"
      :size="20"
      v-bind:index="index"
      v-bind:enableEdit="enableEdit"
      v-bind:onScoreChange="(evt) => handleRating(evt, index)"
    />
    <textarea
      v-if="enableEdit"
      rows="10"
      cols="100"
      v-bind:value="review_body"
      v-on:change="(evt) => handleReview(evt, index)"
    />
    <h2 v-else>{{ review_body }}</h2>
    <div
      class="review-button"
      v-if="enableEdit"
      v-on:click="
        () => {
          editReview(index);
          this.enableEdit = false;
        }
      "
    >
      Update
    </div>
  </div>
</template>

<script>
import ReviewStars from "./ReviewStars.vue";
export default {
  components: { ReviewStars },
  name: "review",
  props: [
    "editReview",
    "index",
    "handleRating",
    "handleReview",
    "refreshReviews",
    "isEditable",
    "review_body",
    "rating",
    "user_id",
    "review_id",
  ],
  data() {
      return {
          enableEdit: false,
          isHovering: false,
          user: ""
      }
  },
  created() {
    fetch(`http://localhost:8080/api/users?user_id=${this.user_id}`)
      .then((res) => res.json())
      .then((data) => (this.user = data[0][1]));
  }
};
</script>

<style>
.review-data > h1 {
  font-size: 2em;
}
.review-data > p {
  font-size: 1.25em;
}
textarea {
  display: block;
  background-color: #fff;
  font-family: "Roboto";
  box-sizing: border-box;
}
</style>