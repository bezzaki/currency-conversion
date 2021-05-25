<template>
    <div class="container__currency">
        <div class="conversion__currency">
            <div v-if="showModal">
                <addModal  :currency="currency" @close="toogleModle" />
            </div>
            <div v-if="showRefModal">
                <refreshD @close="refreshModle" />
            </div>
            <div class="btn_mod">
                <button class="btn_postCurr" @click="toogleModle">Add Currency</button>
                <button class="btn_putCurr" @click="refreshModle" >Update Data</button>
            </div>
        </div>
            <table id="currency__table">
                <thead>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    <th>Modify</th>
                    <th>Delete</th>
                </thead>
                <tbody>
                    <tr v-for="(element,key) in currency " :key="key" >
                        <td>{{element.from}}</td>
                        <td>{{element.to}}</td>
                        <td>{{element.val}}</td>
                        <td>
                            <button class="btn" @click="showmModal(element,element._id)">Modify</button>
                        </td>
                        <td>
                                      
                                <button class="btn_del" @click="showdelModal(element._id)">Delete</button>
                        </td>
                    </tr>
                            <div v-if="showModModal">
                                <modifyModal :id="id" :element="elements" :currency="currency" :refresh="reloadData" @close="showmModal" /> 
                            </div>
                            <div v-if="showDelModal">
                                <deleteModal :id="idDel" :currency="currency" :refresh="reloadData"  @exit="showdelModal" />
                            </div>  

                </tbody>
            </table>  
    </div>
</template>
<script>
import axios from 'axios';
import addModal from './addModal.vue';
import modifyModal from './modifyModal.vue';
import deleteModal from './deleteModal.vue';
import refreshD from './refreshData';

export default {
    components : {
        addModal,
        modifyModal,
        deleteModal,
        refreshD,
        
    },
    data () {
        return {
        currency: [],
        showModal: false,
        showModModal:false,
        showDelModal:false,
        showRefModal:false,
        id: 0,
        idDel: 0,
        elements: {},
        reloadData: 0
        }   
    },
    async created () {
       this.getData();
    },
    methods: {
        async getData(){
             this.currency = (await axios.get(`http://localhost:3000/api/currency/all`)).data;

        },
        toogleModle () {
            this.showModal = !this.showModal;
            this.getData();
        },
        refreshModle () {
            this.showRefModal = !this.showRefModal;
            this.getData();
        },
        showmModal (element,ids) {
            this.id = ids;
            this.elements = element;
            this.showModModal = !this.showModModal;
            this.getData();    
            
        },
        showdelModal (element) {
            this.idDel = element;
            this.showDelModal = !this.showDelModal;
            this.getData();
            
        } 
    }
}
</script>
<style>
.container__currency{
    display: block;
    overflow: auto;
    text-align: center;
    align-items: center;
    justify-self: center;
    margin: 5% 0 0;
    z-index: 1;
    width:100%;
    background-color: #d9edff;
}
.btn_mod{
    display: inline-block;
}
.btn_putCurr{
    margin-left: 5px;
}
.btn_postCurr{
    margin-right: 5px;
}
#table_container{
    
    text-align: center;
    justify-self: center;
}
#currency__table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  margin: 3% auto;
}
#currency__table td, #currency__table th {
  border: 1px solid #ddd;
  padding: 8px;
}
#currency__table tr:nth-child(even){background-color: #e1f3f2;}
#currency__table tr:hover {background-color: rgb(221, 221, 221);}
#currency__table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #008afb;
  color: white;
}
input{
    border-radius: 20px;
    padding: 10px;
    margin: 20px 5px 5px;
    width: 20%;
    border: 1px solid #999;
    outline: none;
}
.check-box{
    border-radius: 20px;
    padding: 10px;
    margin: 10px 10px 10px;
    width: 20%;
    border: 1px solid #999;
    outline: none;
}
select{
    border-radius: 20px;
    padding: 10px;
    margin: 20px 5px 5px;
    width: 20%;
    border: 1px solid #999;
    outline: none;
}
option{
    max-height: 50px;
    overflow: scroll;
}
button{
    color: #fff;
    padding: 10PX;
    border-radius: 20PX;
    font-size: 15PX;
    margin: 10px 0;
    border: none;
    outline: none;
    cursor: pointer;
    background: #2968dd;
}
button:hover{
    background: #0dcbe4;
    transition: all 0.3s ease;
}
.btn_del{
    color: #fff;
    padding: 10PX;
    border-radius: 20PX;
    font-size: 15PX;
    margin: 10px 0;
    border: none;
    outline: none;
    cursor: pointer;
    background: #fd0d0d;
}
.btn_del:hover{
    background: #f87102;
    transition: all 0.3s ease;
}
img{
    margin: 0 15px;
}
.crud__currency{
    border: 1px solid black;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.219);
    margin: 0 80px;
}
</style>
