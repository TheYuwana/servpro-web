<template>
  <div class="dashboard-profile">

      <div :class="`avatar ${this.user.picture}`"></div>

      <div class="dashboard-profile-introduction">
          <h2>{{ this.user.name }}</h2>
          <p>Age: {{ this.user.age }}</p>
      </div>

      <div class="dashboard-profile-skills">
          <h2>Skills</h2>

          <div 
            v-for="skill in user.skills"
            :key="skill.name"
            class="dashboard-profile-skills-item">
              <p>{{ skill.name }} <span>{{ skill.scale }}</span></p>
          </div>
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'DashboardProfile',
    data(){
        return {
            user: []
        }
    },
    mounted(){
        this.user = this.$store.getters.getUser
    }
}
</script>

<style lang="scss">
.dashboard-profile{
    padding-top: 25px;
    padding-left: 25px;
    position: relative;

    .avatar{
        width: 150px;
        height: 150px;
    }

    &-introduction{
        text-align: left;
        position: absolute;
        top: 40px;
        left: 200px;
    }

    &-skills{
        text-align: left;
        margin-top: 25px;
        padding-left: 20px;

        &-item{
            display: inline-block;
            background-color: #88F9D4;
            border-radius: 25px;
            padding: 0px 25px;
            margin: 15px;

            p{
                span{
                    display: inline-block;
                    text-align: center;
                    background-color: white;
                    border-radius: 15px;
                    width: 25px;
                    height: 25px;
                    margin-left: 10px;
                    line-height: 1.65rem;
                }
            }
        }
    }
    
}


</style>