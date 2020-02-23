import axios from 'axios'
import url from '../config/url'

export const getProducts = () => ({
    type: 'GET_PRODUCTS'
})
export const getProduct = (id) => {
    return axios.get(`${url}/product/${id}`).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const storeProducts = (form) => {
    return axios.post(`${url}/product`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const updateProduct = (form) => {
    return axios.put(`${url}/product/${form.id}`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const destroyProduct = (id) => {
    return axios.delete(`${url}/product/${id}`).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}