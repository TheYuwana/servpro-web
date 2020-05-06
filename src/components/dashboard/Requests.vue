<template>
  <div class="dashboard-requests">
    
    <h1>Requests</h1>

    <div class="dashboard-requests-items">
        <div 
            v-for="request in requests"
            :key="request.id"
            class="dashboard-requests-items-item">

            <div class="dashboard-requests-items-item-skill"><p>{{ request.skill }}</p></div>
            <h3>{{ request.client }}</h3>
            <p>{{ request.subject }}</p>
            <p>{{ request.details }}</p>

            <p>01-01-2000 to 01-05-2000</p>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'DashboardRequests',
    data(){
        return {
            requests: []
        }
    },
    mounted(){
        this.$store.getters.getRequests.then(requests => {
            this.requests = requests;
        });
    },
    methods: {
        acceptRequest(){
            console.log("Yes");
        }
    }
}
</script>

<style lang="scss">
.dashboard-requests{

    h1{
        margin-bottom: 0px;
    }

    &-items{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        &-item{
            border: 1px solid rgba(222,222,222,0.8);
            border-radius: 15px;
            text-align: left;
            width: 350px;
            margin: 25px 15px 0px 15px;
            padding-left: 15px;
            padding-right: 25px;
            position: relative;

            background-color: white;
            -webkit-box-shadow: 0px 0px 30px 0px rgba(222,222,222,1);
            -moz-box-shadow: 0px 0px 30px 0px rgba(222,222,222,1);
            box-shadow: 0px 0px 30px 0px rgba(222,222,222,1);

            button{
                position: absolute;
                bottom: 0px;
                right: 0px;
            }

            &-skill{
                position: absolute;
                right: 15px;
                top: 0px;
                p{
                    padding: 10px 10px;
                    border-radius: 25px;
                    background-color: #88F9D4;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
            }
        }
        
    }
}


</style>