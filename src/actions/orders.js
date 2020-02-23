import axios from 'axios'
import url from '../config/url'

export const getOrders = () => ({
    type: 'GET_ORDERS'
})

export const storeOrder = (form) => {
    return axios.post(`${url}/order`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}
export const storeOrderDetail = (form) => {
    return axios.post(`${url}/order-detail`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}

export const searchOrder = (form) => ({
    type: 'SEARCH_ORDERS',
    data: form
})
export const getOrder = (id) => ({
    type: 'GET_ORDER',
    data: id
})