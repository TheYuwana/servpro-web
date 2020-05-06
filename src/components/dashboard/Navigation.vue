<template>
  <div class="dashboard-navigation">
    
    <h1>ServPro</h1>

    <div class="dashboard-navigation-items">
        <div 
            v-for="item in navItems"
            :key="item.view"
            v-on:click="navigate(item.view)"
            :class="navClasses(item.view)">
            <p>{{ item.name }}</p>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
    name: 'DashboardNavigation',
    data(){
        return {
            currentView: "requests",
            navItems: [
                {name: "Requests", view: "requests"},
                {name: "Profile", view: "profile"},
                {name: "Logout", view: "logout"}
            ]
        }
    },
    methods: {
        navigate(view){
            this.currentView = view;
            this.$emit('navigate', view);
        },
        navClasses(view){
            return {
                "dashboard-navigation-items-item": true,
                "dashboard-navigation-items-item-active": (view === this.currentView)
            }
        }
    }
}
</script>

<style lang="scss">
.dashboard-navigation{

    border-right: 1px solid rgba(0,0,0,0.1);
    width: 200px;
    height: 100vh;
    background-color: #88F9D4;
    
    &-items{
        margin-top: 50px;
        &-item{
            cursor: pointer;
            border-top: 1px solid rgba(0,0,0,0.1);
            text-align: left;
            padding: 15px 15px;

            p{
                margin: 0px;
            }

            &-active{
                background-color: #9BE8BA;
            }

            &:hover{
                background-color: #B7FFC0;
            }

            &:last-child{
                border-bottom: 1px solid rgba(0,0,0,0.1);
            }
        }
    }
}


</style>