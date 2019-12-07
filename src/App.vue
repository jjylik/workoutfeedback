<template>
  <section id="app" class="section">
    <Level :level="level" />
    <GiveFeedback />
  </section>
</template>

<script>
import GiveFeedback from "./components/GiveFeedback.vue";
import Level from "./components/Level.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    GiveFeedback,
    Level
  },
  computed: mapState(["level"])
};
</script>
