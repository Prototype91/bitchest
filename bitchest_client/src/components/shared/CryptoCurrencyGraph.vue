<template>
  <line-chart
    :data="graphData"
    suffix="€"
    :min="minValue"
    :max="maxValue"
    precision="9"
    decimal=","
    :curve="false"
  ></line-chart>
</template>

<script>
export default {
  name: "CryptoCurrencyGraph",
  props: {
    graphData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      minValue: this.getMinValue().toFixed(2),
      maxValue: this.getMaxValue().toFixed(2),
    };
  },
  methods: {
    getMinValue() {
      let values = Object.values(this.graphData);
      return Math.min(...values) - (Math.min(...values) / 50);
    },
    getMaxValue() {
      let values = Object.values(this.graphData);
      return Math.max(...values) + (Math.min(...values) / 50);
    }
  },
};
</script>
