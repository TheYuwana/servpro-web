import Vue from 'vue'
import Vuex from 'vuex'
import ServProApi from '@/utils/ServProApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    requests: [],
    skills: [],
    user: ''
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
    getRequests: (state) => (refresh) => { 
      if(state.requests.length !== 0 && !refresh){
        return new Promise((resolve, reject) => {
          resolve(state.requests);
        }); 
      }else{
        return ServProApi.listRequests().then((response) => {
          state.requests = response.data.data;
          return new Promise((resolve, reject) => {
            resolve(state.requests);
          }); 
        })
        .catch((error) => {
            // Nothing to handle
        });
      }
    },
    getUser: (state) => { return state.user; }
  },
  mutations: {
    setUser(state, data){
      state.user = data.user;
    },
    setRequests(state, data){
      state.requests = data.requests;
    }
  }
})
