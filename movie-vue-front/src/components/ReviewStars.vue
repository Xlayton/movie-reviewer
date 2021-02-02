<template>
  <div class="review-stars" v-if="!enableEdit">
    <img
      v-for="index in 5"
      v-bind:key="index"
      v-bind:src="
        index <= score ? getImgUrl('fullStar.png') : getImgUrl('emptyStar.png')
      "
      v-bind:width="size"
    />
  </div>
  <div class="review-stars" v-else>
    <img
      v-for="index in 5"
      v-bind:key="index"
      v-bind:src="
        index <= editScore ? getImgUrl('fullStar.png') : getImgUrl('emptyStar.png')
      "
      v-bind:width="size"
      v-on:click="() => setScore(index)"
    />
  </div>
</template>

<script>
export default {
  name: "reviewstars",
  props: ["score", "size", "index", "enableEdit", "onScoreChange"],
  data() {
    return {
      editScore: 0,
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../assets/" + pic);
    },
    setScore(score) {
      this.editScore = score;
      if(this.onScoreChange) {
        this.onScoreChange(score);
      }
    },
  },
  created() {
      this.editScore = this.score;
  }
};
</script>

<style>

</style>