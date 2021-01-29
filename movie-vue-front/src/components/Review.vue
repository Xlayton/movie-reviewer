<template>
  <div class="review">
    <button v-if="isEditable && !enableEdit" v-on:click="() => this.enableEdit = true">Edit Review</button>
    <h1>{{user_id}}</h1>
    <ReviewStars v-bind:score="rating" :size="50" v-bind:index="index" v-bind:enableEdit="enableEdit" v-bind:onScoreChange="(evt) => handleRating(evt, index)" />
    <textarea v-if="enableEdit" rows="10" cols="100" v-bind:value="review_body" v-on:change="(evt) => handleReview(evt, index)" />
    <h2 v-else>{{review_body}}</h2>
    <button v-if="enableEdit" v-on:click="() => {editReview(index); this.enableEdit = false}">Update</button>
  </div>
</template>

<script>
import ReviewStars from './ReviewStars.vue';
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
          enableEdit: false
      }
  }
};
</script>

<style>
</style>