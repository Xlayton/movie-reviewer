<template>
  <div class="review-stars" v-if="!enableEdit">
    <img
      v-for="index in 10"
      v-bind:key="index"
      v-bind:src="
        index <= score ? ((index%2)==0 ?  getImgUrl('halfStarR.png') : getImgUrl('halfStarL.png')) : ((index%2)==0 ?  getImgUrl('emptyHalfStarR.png'): getImgUrl('emptyHalfStarL.png'))
      "
      class="star"
      :style="userStyle"
    />
  </div>
  <div class="review-stars" v-else>
    <img
      v-for="index in 10"
      v-bind:key="index"
      v-bind:src="index <= editScore? ((index%2)==0 ?  getImgUrl('halfStarR.png') : getImgUrl('halfStarL.png')) : ((index%2)==0 ?  getImgUrl('emptyHalfStarR.png'): getImgUrl('emptyHalfStarL.png'))"
      v-on:click="() => setScore(index)"
      class="star"
      :style="userStyle"
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
      if (this.onScoreChange) {
        this.onScoreChange(score);
      }
    },
  },
  created() {
    this.editScore = this.score;
  },
  computed: {
    userStyle() {
      return {
        '--width': this.size + "px",
      };
    },
  },
};
</script>

<style scoped>
.review-stars{
  display: flex;
  flex-direction: row;
  justify-content: center;
 min-width: var(--width)*5;
}
.star {
  height: var(--width);
}
</style>