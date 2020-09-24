import axios from 'axios';
const api = process.env.REACT_APP_API_URL
export default class WrapperAxios {
    post(url, data) {
        console.log(api);
        console.log(url);
        //return axios.post(`http://localhost:8080/${url}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        return axios.post(`${url}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    }

    put(url, data) {
        console.log(api);
        console.log(url);
        //return axios.put(`http://localhost:8080/${url}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        return axios.put(`${url}`, data, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token') } })

    }

    get(url) {
        console.log(api);
        console.log(url);
        //return axios.get(`http://localhost:8080/${url}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        return axios.get(`${url}`,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    }

    delete(url, data) {
        return axios.delete(`${url}`, {data : {data},  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        //return axios.get(`${api}/${url}`,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    }

}