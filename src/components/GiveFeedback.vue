<template>
  <div class="container">
    <h1 class="title has-text-centered">Miten treeni sujui?</h1>
    <div class="rating is-flex">
      <span
        v-for="(item, index) in ratingOptions"
        :key="index"
        :class="{ active: selectedRating === item.rating }"
        @click="rate(item.rating, item.feedback)"
        >{{ item.label }}</span
      >
    </div>

    <b-notification
      class="thank-you-notification"
      indefinite
      :active="hasRated"
      type="is-success"
      :closable="false"
      >{{ selectedFeedback }}</b-notification
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GiveFeedback",
  data() {
    return {
      ratingOptions: [
        {
          rating: 1,
          label: "😾",
          feedback: "Voi ei, ensi kerralla paremmin! 🙏"
        },
        {
          rating: 2,
          label: "😺",
          feedback: "Mahti juttu, kiitos! 🙏"
        },
        {
          rating: 3,
          label: "😸",
          feedback: "Mahti juttu, kiitos! 🙏"
        }
      ],
      selectedFeedback: null
    };
  },
  computed: mapState({
    selectedRating: state => state.selectedRating,
    hasRated: state => state.selectedRating != null
  }),
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

.rating {
  align-items: center;
  justify-content: center;
  span {
    font-size: 2em;
    margin: 0 20px;
    filter: grayscale(100%);
    cursor: pointer;
    &.active {
      font-size: 3em;
      filter: grayscale(0%);
    }
  }
}
</style>
