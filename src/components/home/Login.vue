<template>
  <div class="home-login">
    
    <p>
        Got an account? <br/>
        Type your name below to continue!
    </p>

    <TextInput 
        placeholder="Name"
        inputName="name"
        inputType="text"
        v-model="name" />
    
    <button v-on:click="submitLogin()">Login</button>

    <div class="error-box" v-show="showError">
        <h3>Something went wrong!</h3>
        <p>User not found</p>
    </div>

    <p>Don't have an account? Click <router-link to="/register">here</router-link> to create one!</p>

  </div>
</template>

<script>

import TextInput from '@/components/form/TextInput'
import ServProApi from '@/utils/ServProApi'
export default {
  name: 'HomeLogin',
  components: {
    TextInput
  },
  data(){
    return {
        showError: false,
        name: ''
    }
  },
  methods: {
    submitLogin(){
      this.showError = false;
      ServProApi.getUser(this.name).then((response) => {
        this.$store.commit('setUser', {user: response.data.data});
        this.$router.push({ name: 'Dashboard' });
      })
      .catch((error) => {
        this.showError = true;
      });
    }
  }
}
</script>

<style lang="scss">

.home-login{

    .form-text-input{
        width: 250px;
        margin: 0px auto 15px auto;
    }
}

</style>
