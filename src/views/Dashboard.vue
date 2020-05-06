<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {
    
  },
  data(){
    return {
        
    }
  },
  watch: {
    $route(to, from) {
      
    }
  },
  mounted(){
    if(this.$store.getters.getUser == ''){
      this.$router.push({ name: 'Home' });
    }else{
      
    }
  }
}
</script>