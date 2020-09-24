import axios from 'axios';
const api = process.env.REACT_APP_API_URL
export default class WrapperAxios {

    post(url, data) {
        //return axios.post(`http://localhost:8080/${url}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        return axios.post(`${api}/${url}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    }

    put(url, data) {
        //return axios.put(`http://localhost:8080/${url}`, data, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        return axios.put(`${api}/${url}`, data, { headers: {Authorization: 'Bearer ' + localStorage.getItem('token') } })

    }

    get(url) {
        //return axios.get(`http://localhost:8080/${url}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        return axios.get(`${api}/${url}`,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    }

    delete(url, data) {
        return axios.delete(`${api}/${url}`, {data : {data},  headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
        //return axios.get(`${api}/${url}`,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
    }

}