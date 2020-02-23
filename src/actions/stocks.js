import axios from 'axios'
import url from '../config/url'

export const getStocks = () => ({
    type: 'GET_STOCKS'
})
export const storeStock = (form) => {
    return axios.post(`${url}/stock`, form).then((response)=>{
        return response.data
    }).catch(err=>{
        return err.response.data
    })
}