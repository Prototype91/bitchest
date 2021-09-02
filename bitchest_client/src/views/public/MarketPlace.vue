<template>
  <main>
    <Navigation />
    <div class="market-ctn">
      <section class="sell">
        <div class="btn-ctn">
          <button class="btn btn-primary">Acheter</button>
          <button class="btn btn-secondary">Vendre</button>
        </div>

        <div class="inputs">
          <div class="input-euro">
            <label for="acheter">Dépenser</label>
            <input id="acheter" type="text">
          </div>
          <div class="input-crypto">
            <label for="vendre">Recevoir</label>
            <div class="input-ctn">
              <div>
                <input id="vendre" type="text">
              </div>
              <div class="select-ctn">

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Navigation from "../../components/shared/Navigation.vue";
export default {
  name: "MarketPlace",
  components: { Navigation },
};
</script>

<style scoped>
.market-ctn {
  display: flex;
  justify-content: center;
}

.market-ctn section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.market-ctn .btn-ctn {
  width: 250px;
  display: flex;
  justify-content: space-evenly;
}



.input-ctn {
  box-sizing: border-box;
    margin: 0;
    min-width: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-top: 10px;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.input-ctn input {
  box-sizing: border-box;
    margin: 0;
    min-width: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.select-ctn {
  box-sizing: border-box;
    margin: 0;
    min-width: 0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 50px;
    padding: 8px;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
    width: 116px;
}
</style>
