<template>
  <div class="home-register">
    
    <p>
        Just fill these in and you are good to go!
    </p>
    <p>Already have an account? Click <router-link to="/">here</router-link> to login!</p>

    <h3>A little bit about yourself</h3>

    <TextInput 
        placeholder="Name"
        inputName="name"
        inputType="text"
        v-model="user.name" />
    
    <TextInput 
        placeholder="Age"
        inputName="age"
        inputType="number"
        v-model="user.age" />

    <h3>Choose a nice profle picture!</h3>

    <div class ="avatars">
        <div 
            v-for="item in [1, 2, 3, 4, 5]" 
            :key="item"
            v-on:click="selectAvatar(item)"
            :class="avatarClasses(item)"></div>
    </div>

    <h3>What are you good at?</h3>

    <div class ="skills">
        <div 
            v-for="(skill, index) in skillOptions" 
            :key="index" 
            v-on:click="selectSkill(skill.name)"
            :class="skillClasses(skill.name)">

            <p>{{ skill.name }}</p>
        </div>
    </div>

    <h3>Give your skill(s) a score!</h3>

    <div class="scales">
        <div 
            v-for="(skill, index) in skills" 
            :key="index"
            class="scales-item">
            
            <div class="scales-item-label">
                <p>{{ skill }}</p>
            </div>
            <div class="scales-item-slider">
                <VueSlideBar 
                    :min="1"
                    :max="10"
                    v-model="skillScales[skill]"/>
            </div>
            
        </div>
    </div>

    <h3>All good?</h3>

    <button v-on:click="submitRegister()">Register now!</button>

    <div class="error-box" v-show="showError">
        <h3>Something went wrong!</h3>
        <p v-for="(error, index) in errorMessages" :key="index">{{ error }}</p>
    </div>

  </div>
</template>

<script>
import TextInput from '@/components/form/TextInput'
import VueSlideBar from 'vue-slide-bar'
import ServProApi from '@/utils/ServProApi'
export default {
    name: 'HomeRegister',
    components: {
        TextInput,
        VueSlideBar
    },
    data(){
        return {
            showError: false,
            errorMessages: [],
            skillOptions: [],
            user: {
                name: '',
                age: '',
                avatar: '',
                picture: ''
            },
            skills: [],
            skillScales: {}
        }
    },
    mounted(){
        this.$store.getters.getSkills.then(skills => {
            this.skillOptions = skills;
        });
    },
    methods: {
        submitRegister(){
            this.showError = false;
            this.errorMessages = [];
            const skillKeys = Object.keys(this.skillScales);
            const skills = [];
            for(var i = 0; i < skillKeys.length; i++){
                skills.push({
                    name: skillKeys[i],
                    scale: this.skillScales[skillKeys[i]]
                })
            }

            this.user.picture = `avatar-${this.user.avatar}`;

            ServProApi.register(this.user, skills).then((response) => {
                this.$router.push({ name: 'Home' });
            })
            .catch((error) => {
                if(error.response.status === 400){
                    this.showError = true;
                    let message = '';
                    let errorObj = {};
                    for(var i = 0; i < error.response.data.data.length; i++){
                        errorObj = error.response.data.data[i];
                        
                        switch(errorObj.error){
                            case "CANNOT_BE_EMPTY": message = `${errorObj.field} cannot be empty!`; break;
                            case "INVALID_PICTURE": message = `Please select a picture!`; break;
                            case "NAME_TAKEN": message = `The name is already taken!`; break;
                            case "NO_SKILL_SELECTED": message = `Please select atleast three skills!`; break;
                        }

                        this.errorMessages.push(message);
                    }
                }
            });
        },
        selectAvatar(item){
            this.user.avatar = item;
        },
        selectSkill(name){
            if(this.skills.includes(name)){
                this.skills.splice(this.skills.indexOf(name), 1);
                delete this.skillScales[name];
                for(var i = 0; i < this.skills.length; i++){
                    this.skillScales[this.skills[i]] = this.skillScales[this.skills[i]];
                }
            }else{
                this.skillScales[name] = 1;
                this.skills.push(name);
            }
        },
        avatarClasses(item){
            const classes = {
                "avatar": true,
                "avatar-selected": (item === this.user.avatar)
            }
            classes[`avatar-${item}`] = true
            return classes;
        },
        skillClasses(name){
            const classes = {
                "skills-item": true,
                "skills-item-selected": this.skills.includes(name)
            }
            return classes;
        }
    }
}
</script>

<style lang="scss">

.home-register{

    .form-text-input{
        width: 250px;
        margin: 0px auto 15px auto;
    }

    .avatars{
        max-width: 600px;
        display: flex;
        justify-content: center;
        margin: 0px auto 15px auto;
        
        .avatar{
            margin: 15px;
            cursor: pointer;
            border: 2px solid rgba(200,200,200,1);

            &:hover{
                border-color: #88F9D4;
            }

            &-selected{
                border-color: #0B877D;
                &:hover{
                    border-color: #0B877D;
                }
            }
        }
    }

    .skills{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        &-item{
            border: 1px solid black;
            border-radius: 25px;
            padding: 0px 25px;
            margin: 15px;
            cursor: pointer;

            &-selected{
                background-color: #88F9D4;
                border-color:rgba(0,0,0,0);
                &:hover{
                    background-color: rgba(136, 249, 212, 0.65);
                }
            }

            &:hover{
                border-color: #88F9D4;
            }
        }
    }

    .scales{
        &-item{
            display: flex;
            justify-content: space-evenly;

            &-label{
                width: 300px;
                p{
                    display: inline-block;
                    padding: 15px 25px;
                    border-radius: 25px;
                    background-color: #88F9D4;
                }
            }

            &-slider{
                width: 100%;
            }
        }
    }
}

</style>
