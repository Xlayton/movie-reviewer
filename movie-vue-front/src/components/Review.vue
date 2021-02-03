<template>
  <div
    class="review"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
  >
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
    <button
      v-if="isEditable && !enableEdit"
      :class="{ hovered: isHovering }"
      v-on:click="() => (this.enableEdit = true)"
      class="button edit-button"
    >
      Edit Review
    </button>
    <div
      class="button"
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
      user: "",
    };
  },
  created() {
    console.log(this.user_id);
    fetch(`http://localhost:8080/api/users?user_id=${this.user_id}`)
      .then((res) => res.json())
      .then((data) => (this.user = data[0][1]));
  },
};
</script>

<style scoped>
.review > h1 {
  font-size: 2em;
}
.review > p {
  font-size: 1.25em;
}
textarea {
  display: block;
  background-color: #fff;
  font-family: "Roboto";
  box-sizing: border-box;
}
.review {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.button.hovered {
  display: block;
}
.button {
  position: absolute;
  display: none;
  align-self: flex-end;
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
</style>