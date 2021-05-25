<template>
  <form @submit.prevent="handleSubmit">
    <label>User Name</label>
    <input
      type="text"
      required
      v-model="username"
    />

    <label>Email</label>
    <input type="text" required v-model="email" />

    <label>Password</label>
    <input type="password" required v-model="password" />

    <label>Repeat Password</label>
    <input type="password" required v-model="repassword" />

    <div class="submit">
      <button @click="register">Create an Account</button>
    </div>
    <p v-if="passwordError" class="pass">{{ passwordError }}</p>
  </form>
</template>

<script>
import axios from "axios";
import useRouter from 'vue-router';

export default {
  data() {
    return {
      email: "",
      password: "",
      repassword: "",
      passwordError: "",
      username: "",
    };
  },
  methods: {
    async register() {
      let registerdata = {
        email: this.email,
        password: this.password,
        username: this.username,
      };
      await axios.post("http://localhost:3000/api/user/create", registerdata);
    },
    async handleSubmit() {
      console.log("form submitted");
      // validate password
      if (this.password !== this.repassword) {
        this.passwordError = "Password dosn't Match";
      } else if (this.password.length < 8) {
        this.passwordError = "Please enter a password more than 7 caractere";
      } else {
        this.passwordError = "Valide Password";
        await useRouter.push('/login');
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px sold #ddd;
  color: #555;
  background: #eee;
}
.pill {
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
button {
  background: rgb(110, 150, 235);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}
.pass {
  margin-top: 5px;
  color: rgb(24, 124, 20);
  margin-left: 5px;
  padding: 4px;
}
</style>
