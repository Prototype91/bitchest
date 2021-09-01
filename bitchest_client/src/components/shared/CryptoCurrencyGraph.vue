<template>
  <line-chart
    :data="cryptoCurrencyData"
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
