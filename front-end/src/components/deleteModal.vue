<template>
  <div class="backdropDel" @click.self="closeDelModal">
      <div class="modalDel">
          <h4>Are you Sure You want to Delete this Currency</h4>
            <button type="button" @click="deleteCurrency">Sure</button>
            <button type="button" style="margin-left: 5px;" @click="closeDelModal">Close</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['currency','id'],
    data () {
        return {
            item: {
                id: 0
            }
        }
    },
    methods: {
        closeDelModal () {
            this.$emit('exit')

        },
        async deleteCurrency () {
            this.item.id = this.id
            this.currency =  await axios.put(`http://localhost:3000/api/currency/delete`,this.item,{
                headers:{
                    "x-auth-token":localStorage.getItem("token")
                }
            }).then((response)=>{
                    console.log(response.data);
                    this.closeDelModal();
                }).catch((err)=>{
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>  
    .modalDel{
        width: 400px;
        padding: 20px;
        margin: 100px auto;
        background: white;
        border-radius: 10px;
    }
    .backdropDel{
        top: 0;
        left: 0;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
    }
</style>