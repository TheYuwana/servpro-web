const axios = require('axios');
const baseUrl = "http://localhost:4000";

var ServProApi = {

    register(user, skills){
        return axios.post(urlBuilder('/api/account/register'), {
            user: user,
            skills: skills
        })
    },

    listSkills(){
        return axios({
            url: urlBuilder('/api/account/list-skills'),
            method: 'get'
        })
    }

    // getFilter(filterId){
    //     return axios({
    //         url: urlBuilder(`/api/search/${filterId}`),
    //         method: 'get'
    //     })
    // }
}
export default ServProApi;

function urlBuilder(path){
    return `${baseUrl}${path}`;
}
