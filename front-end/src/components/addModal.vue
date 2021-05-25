<template>
  <div class="backdrop" @click.self="closeModal">
      <div class="modal">
          <h1>Add Currency</h1>
                <input type="text" name="fromAdd" placeholder="From Currency"  value="EUR"  disabled>
                <input type="text" name="toAdd" placeholder="To Currency" v-model="item.addTo" >
                <input type="number" name="valAdd" placeholder="Value Currency" v-model="item.addValue" ><br>
                
                <button type="button" @click="addCurrency">Add</button>
                <button type="button" style="margin-left: 5px;" @click="closeModal">Close</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['add', 'currency'],
    data () {
        return {
            item:{
                addFrom: '',
                addTo: '',
                addValue: 0
            }
        }
    },
    methods: {
        closeModal () {
            this.$emit('close');
        },
        clearForm () {
        this.item.addFrom = ''
        this.item.addTo = ''
        this.item.addValue = ''
        },
        async addCurrency () {
            this.item.addFrom = this.item.addFrom.toUpperCase()
            this.item.addTo = this.item.addTo.toUpperCase()
            this.item.addValue = this.item.addValue.toUpperCase()
            this.currency =  await axios.post(`http://localhost:3000/api/currency/post`,this.item,{
                headers:{
                    "x-auth-token":localStorage.getItem("token")
                }}).then((response)=>{
                    console.log(response.data);
                    this.closeModal();
                }).catch((err)=>{
                    console.log(err);
                });
        
        }
    },

}
</script>

<style scoped>  
    .modal{
        width: 400px;
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
    }
    .backdrop{
        top: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
</style>