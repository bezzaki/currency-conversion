<template>
  <div class="backdropMod" >
      <div class="modalMod">
          <h1>Refrsh Data</h1>
                <p> Wait until refresh is Finish</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        closeModal () {
                this.$emit('close');  
        },
         async refreshData() {
            await axios.put(`http://localhost:3000/api/currency/refresh`)
            .then(()=>{
                this.closeModal();
            });
        }
    },
    created() {
        this.refreshData();
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
