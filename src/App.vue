<template>
  <section id="app" class="section">
    <Level :level="level" />
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
    <GiveFeedback v-if="workoutActive && !isLoading" />
    <NoActiveWorkouts v-else-if="!isLoading" />
  </section>
</template>

<script>
import GiveFeedback from "./components/GiveFeedback.vue";
import Level from "./components/Level.vue";
import NoActiveWorkouts from "./components/NoActiveWorkouts.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    GiveFeedback,
    Level,
    NoActiveWorkouts
  },
  computed: mapState({
    workoutActive: state => state.currentWorkout.status !== "NOT_FOUND",
    level: state => state.level,
    isLoading: state => state.currentWorkout.status === "NOT_INITIALIZED"
  }),
  created() {
    this.$store.dispatch("fetchCurrentWorkout");
  }
};
</script>
