import { createStore } from "vuex";

export default createStore({
  state: {
    cryptoCurrencies: [
      {
        id: 1,
        name: "Bitcoin",
        price: 35000,
      }]
  }
});