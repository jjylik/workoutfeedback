<template>
  <div class="container">
    <b-tag class="user-level" :type="type" :size="size">Taso {{ level }}</b-tag>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  computed: {
    size: function() {
      if (this.level <= 1) {
        return "default";
      } else if (this.level === 2) {
        return "is-medium";
      }
      return "is-large";
    },
    type: function() {
      if (this.level <= 1) {
        return "is-gray";
      } else if (this.level === 2) {
        return "is-dark";
      }
      return "is-primary";
    }
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";
.user-level {
  margin-bottom: $block-spacing;
}
</style>
