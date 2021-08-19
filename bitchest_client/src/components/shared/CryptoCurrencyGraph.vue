<script>
import { Bar } from "vue3-chart-v2";
export default {
  name: "CryptoCurrencyGraph",
  extends: Bar,
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
          backgroundColor: "#f87979",
          responsive: true,
          maintainAspectRatio: false,
          width: "100px",
        },
      ],
    });
  },
};
</script>
