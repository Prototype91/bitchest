<template>
  <form @submit.prevent="startTransfert" class="inputs">
    <div class="input-crypto">
      <label for="vendre">Vendre</label>
      <div class="input-ctn">
        <div>
          <input
            id="vendre"
            type="text"
            placeholder="0.00"
            v-model="this.crypto_amount"
          />
        </div>
        <div class="select-ctn">
          <img :src="currencyImg" alt="icone de la cryptomonnaie choisie" />
          <select
            name="crypto-select"
            id="crypto-select"
            v-model="currencySelected"
            @change="setCurrentCurrency"
          >
            <option
              v-for="(currency, index) in this.cryptoCurrenciesData"
              :key="index"
              :value="currency.id"
            >
              {{ currency.id }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="input-euro">
      <label for="recevoir">Recevoir</label>
      <div class="input-ctn">
        <div>
          <input
            id="recevoir"
            type="number"
            placeholder="Veuillez entrer le montant"
            v-model="exchange_value"
            @keyup="calculate"
          />
        </div>
        <div class="select-ctn">
          <i class="fas fa-euro-sign"></i>
          <span>EUR</span>
        </div>
      </div>
    </div>
    <button class="btn btn-success" type="submit">Conclure</button>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
form {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  height: 50%;
}
</style>