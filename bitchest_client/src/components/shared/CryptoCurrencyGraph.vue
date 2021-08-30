<script>
import { Line } from "vue3-chart-v2";
export default {
  name: "CryptoCurrencyGraph",
  extends: Line,
  props: {
    cryptoCurrencyData: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
    },
  },
  mounted() {
    const dates = this.cryptoCurrencyData.map((data) => data.time);
    const prices = this.cryptoCurrencyData.map((data) => data.price);

    console.log(dates, prices);

    this.renderChart({
      labels: dates,
      datasets: [
        {
          label: this.label,
          data: prices,
          borderColor: 'rgb(75, 192, 192)',
          responsive: true,
          fill: false,
          tension: 0.1
        },
      ],
    });
  },
};
</script>
