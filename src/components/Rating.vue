<template>
  <div class="rating is-flex">
    <span
      v-for="(item, index) in ratingOptions"
      :key="index"
      role="img"
      aria-label="Rating option"
      :class="{ active: selectedRating === item.rating }"
      @click="rate(item.rating, item.feedback)"
      >{{ item.label }}</span
    >
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    ratingOptions: {
      type: Array,
      default: () => []
    },
    selectedRating: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    rate(score, feedback) {
      this.$emit("rate", score, feedback);
    }
  }
};
</script>

<style lang="scss">
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
