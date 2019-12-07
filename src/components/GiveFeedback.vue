<template>
  <div class="container">
    <h1 class="title has-text-centered">Miten treeni sujui?</h1>
    <Rating
      :rating-options="ratingOptions"
      :selected-rating="selectedRating"
      @rate="rate"
    />
    <b-notification
      class="thank-you-notification"
      animation="slide-next"
      indefinite
      :active="hasRated"
      type="is-success"
      :closable="false"
      >{{ selectedFeedback }}</b-notification
    >
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Rating from "./Rating";
export default {
  name: "GiveFeedback",
  components: { Rating },
  data() {
    return {
      selectedFeedback: null
    };
  },
  computed: {
    ...mapState({
      selectedRating: state => state.selectedRating,
      hasRated: state => state.selectedRating != null
    }),
    ...mapGetters({ ratingOptions: "getRatingOptions" })
  },
  methods: {
    rate(score, feedback) {
      this.selectedFeedback = feedback;
      this.$store.dispatch("rate", score);
    }
  }
};
</script>

<style lang="scss">
.thank-you-notification {
  max-width: 20em;
  margin: auto;
  font-size: 20px;
}
</style>
