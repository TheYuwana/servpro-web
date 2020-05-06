<template>
  <div class="home">

    <h1>Welcome to ServPro!</h1>

    <HomeLogin v-if="view === 'Home'" />
    <HomeRegister v-if="view === 'Register'" />

  </div>
</template>

<script>
import HomeLogin from '@/components/home/Login'
import HomeRegister from '@/components/home/Register'
export default {
  name: 'Home',
  components: {
    HomeLogin,
    HomeRegister
  },
  data(){
    return {
        view: 'login'
    }
  },
  watch: {
    $route(to, from) {
      this.view = to.name;
    }
  },
  mounted(){
    this.view = this.$route.name;
  }
}
</script>

<style lang="scss">
.home {
  max-width: 960px;
  margin: 0px auto;
  padding-bottom: 50px;
}
</style>
