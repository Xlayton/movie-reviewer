<template>
  <div class="review">
    <button v-if="isEditable">Edit Review</button>
    <h1>{{user_id}}</h1>
    <h3>{{rating}}</h3>
    <textarea v-if="enableEdit" rows="10" cols="100" v-bind:value="review_body" v-on:change="(evt) => this.review_body = evt.target.value" />
    <h2 v-else>{{review_body}}</h2>
  </div>
</template>

<script>
export default {
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