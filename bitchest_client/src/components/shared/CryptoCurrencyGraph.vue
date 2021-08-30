<template>
  <line-chart
    :data="cryptoCurrencyData"
    suffix="€"
    :min="minValue"
    :max="maxValue"
  ></line-chart>
</template>

<script>
// import { Line } from "vue3-chart-v2";
export default {
  name: "CryptoCurrencyGraph",
  props: {
    cryptoCurrencyData: {
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
      let values = Object.values(this.cryptoCurrencyData);
      this.minValue =  Math.min(...values);
    },
    getMaxValue() {
      let values = Object.values(this.cryptoCurrencyData);
      this.maxValue =  Math.max(...values);
    }
  },
};
</script>
