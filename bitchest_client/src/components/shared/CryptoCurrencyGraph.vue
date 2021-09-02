<template>
  <line-chart
    :data="graphData"
    suffix="€"
    :min="minValue"
    :max="maxValue"
    precision="9"
    decimal=","
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
      minValue: null,
      maxValue: null,
    };
  },
  methods: {
    getMinValue() {
      let values = Object.values(this.graphData);
      this.minValue =  Math.min(...values);
    },
    getMaxValue() {
      let values = Object.values(this.graphData);
      this.maxValue =  Math.max(...values);
    }
  },
};
</script>
