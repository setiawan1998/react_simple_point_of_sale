import axios from 'axios'
import url from '../config/url'

export const getCategories = () => ({
    type: 'GET_CATEGORIES'
})
export const getCategory = (id) => {
    return axios.get(`${url}/category/${id}`).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const storeCategory = (form) => {
    return axios.post(`${url}/category`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const updateCategory = (form) => {
    return axios.put(`${url}/category/${form.id}`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const destroyCategory = (id) => {
    return axios.delete(`${url}/category/${id}`).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}