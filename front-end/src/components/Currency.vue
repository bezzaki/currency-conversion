<template>
    <div class="currency__container" id="section">
        <div class="currency__img">
            <img src="../assets/pic2.svg" id="currency__img" alt="pic">
        </div>
        <div class="currency">
                <h2>Currency Converter</h2>
                <input  type="number" class="input-box" required placeholder="From Currency" v-model="amountFrom">
                <select  class="input-box" v-model="selectedFrom" >
                    <option  v-for="from in currencyFrom" :key="from" >{{from}}</option>
                </select>
                <input type="number" class="input-box" required placeholder="To Currency" :value="valueTo" readonly>
                <select  v-model="selectedTo" class="input-box">
                    <option v-for="to in currencyTo" :key="to" >{{to}}</option>
                </select>
                <input type="submit" class="button-submit" @click="calculeCurrency()">
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default ({
  data () {
    return {
      currencyFrom: [],
      currencyTo: [],
      selectedFrom: '',
      selectedTo: '',
      amountFrom: 0,
      amountTo: 0,
      allCurr: [],
      calcule: {}
    }
  },
  methods: {
    async calculeCurrency() {
      this.calcule = (await axios.get(`http://localhost:3000/api/currency?from=${this.selectedFrom}&value=${this.amountFrom}&to=${this.selectedTo}`)).data;
      this.amountTo = JSON.parse(JSON.stringify(this.calcule)).value
    },
    async getCurrency() {
      let i = 0;
      this.allCurr = await axios.get(`http://localhost:3000/api/currency/all`).then((result) => {
        let valeur = result.data;
        for(i=0;i<valeur.length;i++){
          this.currencyFrom.push(valeur[i].to);
          this.currencyTo.push(valeur[i].to);
          
        }
        // console.log(this.currencyFrom);
        // console.log(this.currencyTo);
      
      })
      
    }
  },
  computed: {
    valueTo () {
      return this.amountTo
    }
  },
  created () {
    this.getCurrency();

  }
})
</script>
<style scoped>
select option{
  position: relative;
  max-height: 60px;
}
</style>