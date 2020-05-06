const axios = require('axios');
const baseUrl = "http://localhost:4000";

var ServProApi = {

    register(user, skills){
        return axios.post(urlBuilder('/api/account/register'), {
            user: user,
            skills: skills
        })
    },

    acceptRequest(user_id, request_id){
        return axios.put(urlBuilder('/api/request/accept'), {
            user_id: user_id,
            request_id: request_id
        })
    },

    listSkills(){
        return axios({
            url: urlBuilder('/api/account/list-skills'),
            method: 'get'
        })
    },

    listRequests(){
        return axios({
            url: urlBuilder('/api/request/list'),
            method: 'get'
        })
    },

    getUser(name){
        return axios({
            url: urlBuilder(`/api/account/user/${name}`),
            method: 'get'
        })
    }
}
export default ServProApi;

function urlBuilder(path){
    return `${baseUrl}${path}`;
}
