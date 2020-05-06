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

    <p>Don't have an account? Click <router-link to="/register">here</router-link> to create one!</p>

  </div>
</template>

<script>

import TextInput from '@/components/form/TextInput'

export default {
  name: 'HomeLogin',
  components: {
    TextInput
  },
  data(){
    return {
        name: ''
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
