import axios from 'axios'
import url from '../config/url'

export const signin = (form) => {
    return axios.post(`${url}/signin`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const signup = (form) => {
    return axios.post(`${url}/user`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}