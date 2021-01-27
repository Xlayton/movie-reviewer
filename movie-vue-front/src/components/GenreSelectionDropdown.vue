<template>
  <select v-on:change="onGenreChange">
        <option selected disabled>Select a genre...</option>
        <option v-for="genre in genres" :key="genre.id" v-bind:value="genre.id">{{genre.name}}</option>
    </select>
</template>

<script>
export default {
    name: "genreselectiondropdown",
    data() {
        return {
            genres: []
        }
    },
    props: ['onGenreChange'],
    created() {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=77c34d76c76368a57135c21fcb3db278&language=en-US`)
        .then(res => res.json())
        .then(data => this.genres = data.genres)
    }
}
</script>

<style>

</style>