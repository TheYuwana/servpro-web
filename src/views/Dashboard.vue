<template>
  <div class="dashboard">
    
    <div class="profile">
      <p>{{ this.user.name }}</p>
      <div :class="`avatar ${this.user.picture}`"></div>
    </div>

    <DashboardNavigation
      v-on:navigate="changeView" />

    <div class="dashboard-content">
      <DashboardRequests v-if="view === 'requests'" />
      <DashboardProfile v-if="view === 'profile'" />
    </div>

  </div>
</template>

<script>
import DashboardNavigation from '@/components/dashboard/Navigation.vue'
import DashboardRequests from '@/components/dashboard/Requests.vue'
import DashboardProfile from '@/components/dashboard/Profile.vue'
export default {
  name: 'Dashboard',
  components: {
    DashboardNavigation,
    DashboardRequests,
    DashboardProfile
  },
  data(){
    return {
        view: 'requests',
        user: {
          name: '',
          age: 0,
          picture: ''
        }
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
      this.user = this.$store.getters.getUser;
    }
  },
  methods: {
    changeView(view){
      // TODO: logout not working completely
      if(this.view === 'logout'){
        this.$store.commit('setUser', {user: ''});
        this.$router.push({ name: 'Home' });
        
      }else{
        this.view = view;
      }
    }
  }
}
</script>

<style lang="scss">
.dashboard{
  position: relative;
  display: flex;

  .profile{
    position: absolute;
    display: flex;
    right: 10px;
    top: 10px;

    p{
      margin-top: 24px;
      margin-right: 15px;
      font-size: 1.2rem;
    }
  }

  &-content{
    height: calc(100vh - 165px);
    overflow-y: scroll;
    padding-bottom: 50px;
    border-top: 1px solid rgba(0,0,0,0.1);
    width: 100%;
    margin-top: 115px;
  }

}


</style>