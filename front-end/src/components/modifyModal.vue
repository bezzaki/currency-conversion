<template>
  <div class="backdropMod" @click.self="closeModal">
      <div class="modalMod">
          <h1>Modify Currency</h1>
                <input type="text" placeholder="From Currency" v-model="item.modFrom" >
                <input type="text" placeholder="To Currency" v-model="item.modTo" >
                <input type="text" placeholder="Value Currency" v-model="item.modValue" ><br>
                <button type="button" @click.prevent="modifyCurrency()"><span>Modify</span></button>
                <button type="button" style="margin-left: 5px;" @click="closeModal()">Close</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['currency', 'id', 'element'],
    data () {
        return {
            item: {
                modFrom: '',
                modTo: '',
                modValue: 0,
                id: 0,
                toogle: false,
            }
        }
    },
    methods: {
        closeModal () {
                this.$emit('close');  
        },
        clearForm () {
        this.item.modFrom = ''
        this.item.modTo = ''
        this.item.modValue = ''
        },
        async modifyCurrency () {
        // Modify
        this.item.id = this.id;
        console.log('currency/update');
        try {
            const response = await axios.put(`http://localhost:3000/api/currency/update`,this.item,{
                headers:{
                    "x-auth-token":localStorage.getItem("token")
                }});
                console.log('response currency/update');
                    console.log(response.data);

                    this.closeModal();

        } catch (error) {
            console.log('err currency/update');
                    console.log(error);
        }
        
                
        }
    },
    created() {
        this.item.modFrom = this.element.from
        this.item.modTo = this.element.to
        this.item.modValue = this.element.val
    }
}
</script>

<style scoped>  
    .modalMod{
        width: 400px;
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
    }
    .backdropMod{
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        margin: 0;
    }
    p{
        font-weight: bold;
    }
</style>