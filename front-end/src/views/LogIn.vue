<template>
  <form @submit.prevent="">
      <label >Email</label>
      <input type="email" required v-model="email" @keyup="connectionError = ''">
      <label >Password</label>
      <input type="password" required v-model="password" @keyup="connectionError = ''" >
        <div class="submit">
            <button @click="login()">Log IN</button>
        </div>
        <p v-if="connectionError" class="conn">{{connectionError}}</p>
  </form>
</template>

<script>
import axios from 'axios';
// import router from '../router';
export default {
  data () {
    return {
      email: '',
      password: '',
      connectionError: '',
      loggin: false,
      connect: ''
    }
  },
  methods: {
    async login() {
      let item = {
        email: this.email,
        password: this.password
      }
      this.loggin = (await axios.post(`http://localhost:3000/api/user/auth`, item)).data;
      console.log(this.loggin);
      this.handleSubmit();
      
    },
     handleSubmit () {
      console.log('form submitted')
      // validate password
      if (this.loggin == false) {
        this.connectionError = 'Email or Password is incorrect'
        let token = localStorage.getItem("token");
        console.log(token);
      } else {
        this.connectionError = 'Connect Succesfully'
      this.webtoken();
      // router.push('Dashboard');
      location.reload();
      }
      this.loggin = false
    },
    async webtoken () {
      let token = this.loggin;
      localStorage.setItem("token",token);
      this.connect = (await axios.get(`http://localhost:3000/api/user/me`,{
        headers:{
          'x-auth-token': localStorage.getItem("token")
        }
      })).data ;
    }
  }
}
</script>

<style scoped>
form{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label{
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input, select{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px sold #ddd;
    color: #555;
    background: #eee;
}
.pill{
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}
button{
    background: rgb(110, 150, 235);
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
}
.submit{
    text-align: center;
}
.conn{
  margin-top: 5px;
  color: rgb(24, 124, 20);
  margin-left: 5px;
  padding: 4px;
}

</style>
