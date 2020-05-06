<template>
  <div class="dashboard-requests">
    
    <div :class="popupClasses()">
        <p>{{ this.popup.message }}</p>
    </div>

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
            
            <div class="dashboard-requests-items-item-dates">
                <p><span>Start:</span> {{ parseDate(request.start_date) }}</p>
                <p><span>End:</span> {{ parseDate(request.end_date) }}</p>
            </div>
            
            <div :class="statusClasses(request.user)" v-on:click="acceptRequest(request.id)">
                <p>{{ statusText(request.user) }}</p>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import ServProApi from '@/utils/ServProApi'
export default {
    name: 'DashboardRequests',
    data(){
        return {
            popup: {
                show: false,
                error: false,
                message: ''
            },
            user: {
                id: ''
            },
            requests: []
        }
    },
    mounted(){
        this.user = this.$store.getters.getUser;
        this.$store.getters.getRequests(false).then(requests => {
            this.requests = requests;
        });
    },
    methods: {
        acceptRequest(request_id){

            this.popup.show = false;
            this.popup.error = false;
            this.popup.message = "";

            ServProApi.acceptRequest(this.user.id, request_id).then((response) => {
                
                this.popup.show = true;
                this.popup.error = false;
                this.popup.message = "Updated!";

                setTimeout(() => {
                    this.popup.show = false;
                }, 3000)

                this.$store.getters.getRequests(true).then(requests => {
                    this.requests = requests;
                });
            })
            .catch((error) => {
                this.popup.show = true;
                this.popup.error = true;
                this.popup.message = "Day is full!";

                setTimeout(() => {
                    this.popup.show = false;
                }, 3000)
            });
        },
        parseDate(request_date){
            let date = new Date(request_date)
            return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        },
        statusText(request_id){
            if(request_id === this.user.id){
                return "Mine";
            }else{
                return "Open";
            }
        },
        popupClasses(){
            return {
                "dashboard-requests-popup": true,
                "dashboard-requests-popup-error": this.popup.error,
                "dashboard-requests-popup-show": this.popup.show,
            }
        },
        statusClasses(request_id){
            return {
                "dashboard-requests-items-item-status": true,
                "dashboard-requests-items-item-status-open": (request_id != this.user.id),
                "dashboard-requests-items-item-status-accepted": (request_id === this.user.id),
            };
        }
    }
}
</script>

<style lang="scss">
.dashboard-requests{
    position: relative;

    h1{
        margin-bottom: 0px;
    }

    &-popup{
        position: fixed;
        border: 1px solid rgba(222,222,222,0.8);
        background-color: white;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(222,222,222,1);
        -moz-box-shadow: 0px 0px 10px 0px rgba(222,222,222,1);
        box-shadow: 0px 0px 10px 0px rgba(222,222,222,1);
        border-left: 5px solid #0DFF3D;
        width: 150px;
        right: -150px;
        opacity: 0;

        transition-property: transform, opacity;
        transition-duration: 0.5s;
        transition-timing-function: ease-out;

        &-error{
            border-left: 5px solid red;
        }

        &-show{
            opacity: 1;
            transform: translateX(-150px);
        }
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
            overflow: hidden;

            background-color: white;
            -webkit-box-shadow: 0px 0px 30px 0px rgba(222,222,222,1);
            -moz-box-shadow: 0px 0px 30px 0px rgba(222,222,222,1);
            box-shadow: 0px 0px 30px 0px rgba(222,222,222,1);

            &-status{
                position: absolute;
                right: -51px;
                bottom: -70px;
                width: 150px;
                height: 150px;
                border-radius: 150px;
                cursor: pointer;

                p{
                    text-align: center;
                    margin-top: 36px;
                    margin-left: -32px;
                }

                &-open{
                    background-color: rgba(0,0,0,0.2);
                    color: black;
                }

                &-accepted{
                    background-color: #0DFF3D;
                    color: black;
                }
            }

            &-dates{
                p{
                    font-size: 0.8rem;
                }
                span{
                    font-weight: 600;
                }
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