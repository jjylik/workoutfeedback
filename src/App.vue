<template>
  <div id="app">
    <GiveFeedback />
  </div>
</template>

<script>
import GiveFeedback from "./components/GiveFeedback.vue";

export default {
  name: "App",
  components: {
    GiveFeedback
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
