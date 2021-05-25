<template>
    <nav class="navbar">
        <div class="navbar__container">
            <router-link to="/" id="navbar__logo">CURRENCY</router-link>
            <div class="navbar__toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="navbar__menu">
                <li class="navbar__btn">
                    <router-link to="/login" class="button" v-if="showlogin() === false">Login</router-link>
                </li>
                <li class="navbar__btn">
                    <router-link  to="/login" class="button" v-if="showlogin() === true" ><span @click="destroyToken()">Logout</span></router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

export default {
  data () {
    return {
        showLog: localStorage.getItem("token"),
        destroy: ''
        
    }
  },
  methods: {
    showlogin() {
        if(this.showLog == null) {
            return false;
        } else {
            return true;
        }
    },
    destroyToken() {
        this.destroy = localStorage.removeItem("token");
        location.reload();
        return this.destroy
        
    }
  }
}
</script>

