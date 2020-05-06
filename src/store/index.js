import Vue from 'vue'
import Vuex from 'vuex'
import ServProApi from '@/utils/ServProApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    skills: []
  },
  getters: {
    getSkills: (state) => { 
      if(state.skills.length !== 0){
        return new Promise((resolve, reject) => {
          resolve(state.skills);
        }); 
      }else{
        return ServProApi.listSkills().then((response) => {
          state.skills = response.data.data;
          return new Promise((resolve, reject) => {
            resolve(state.skills);
          }); 
        })
        .catch((error) => {
            // Nothing to handle
        });
      }
    },
  }
})
