<template>
  <Loading
    :active="this.isLoading"
    :is-full-page="fullPage"
    :loader="loader"
    :background-color="backgroundColor"
    :color="color"
  />
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Loader",
  components: { Loading },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fullPage: true,
      loader: "dots",
      backgroundColor: "black",
      color: "white",
      opacity: 1,
    };
  },
};
</script>
