import React, { useState, useEffect } from 'react'
import {
    Container, Row, Col, Card, CardBody, Button, Input, CardHeader
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import { faHome, faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons'
import HeaderCashier from '../components/headerCashier';

import { connect } from 'react-redux'
import { getProducts } from '../actions/products'
import { storeOrder, storeOrderDetail } from '../actions/orders'
import { ParseNumber } from '../config/parseNumber'
import url from '../config/url'


let Cashier = ({state, getProducts}) => {
    const [order, setOrder] = useState([]);
    const [form, setForm] = useState({
        customer: '',
        operator: localStorage.getItem('userId'),
        subtotal: 0
    })
    const selectProduct = (product) => {
        if(product.stock < 1){
            alert('Empty Stock')
        }else{
            let data = {
                id: product.id,
                product: product.name,
                price: product.price,
                qty: 1
            }
            const findOrder = _.find(order, (item)=> {
                if(item.id === data.id){
                    return item
                }
            })
            if(findOrder === undefined){
                setOrder(prevState => {
                    return [...prevState, data]
                })
                setForm((prevState)=>{
                    return {...prevState, subtotal: form.subtotal+product.price}
                })
            }else{
                const index = _.findIndex(order, {id: data.id});
                if(order[index].qty >= product.stock){
                    alert(`Stock only ${product.stock}`)
                }else{
                    let newData = {
                        id: order[index].id,
                        product: order[index].product,
                        price: order[index].price,
                        qty: order[index].qty+1,
                    }
                    const newOrder = _.remove(order, (item) => {
                        return item.id !== data.id;
                    });
                    newOrder.push(newData)
                    setOrder(newOrder)
                    setForm((prevState)=>{
                        return {...prevState, subtotal: form.subtotal+product.price}
                    })
                }
            }
        }
    }
    const removeProduct = (id, qty) => {
        if(qty===1){
            const newOrder = _.remove(order, (item) => {
                setForm((prevState)=>{
                    return {...prevState, subtotal: form.subtotal-item.price}
                })
                return item.id !== id;
            });
            setOrder(newOrder)
        }else{
            const index = _.findIndex(order, {id});
            let newData = {
                id: order[index].id,
                product: order[index].product,
                price: order[index].price,
                qty: order[index].qty-1,
            }
            const newOrder = _.remove(order, (item) => {
                return item.id !== id;
            });
            newOrder.push(newData)
            setOrder(newOrder)
            setForm((prevState)=>{
                return {...prevState, subtotal: form.subtotal-newData.price}
            })
        }
    }
    const changeForm = async(e) => {
        e.persist();
        await setForm((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const saveOrder = () => {
        if(form.customer===''){
            alert('Please enter customer name')
        }else{
            let subtotal = _.sumBy(order, function(o) { return o.price*o.qty; });
            form.subtotal = subtotal;
            storeOrder(form).then((response)=>{
                order.map((item)=>{
                    let dataDetail = {
                        orderId: response.data.insertId,
                        productId: item.id,
                        price: item.price,
                        qty: item.qty,
                        total: item.price*item.qty,
                        remark: null,
                        operator: localStorage.getItem('userId')
                    }
                    storeOrderDetail(dataDetail)
                })
                if(response.status===200){
                    alert('Order Completed')
                    window.location='/cashier'
                }else{
                    alert(response.message)
                }
            })
        }
    }
    useEffect(()=>{
        getProducts()
    }, [])

    return(
        <Container fluid className="p-0">
            <HeaderCashier type="cashier"/>
            <Container className="p-3">
                <div className="pb-3">
                    <h5><FontAwesomeIcon icon={faHome}/> Cashier</h5>
                </div>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="7" sm="12" xs="12">
                                <h5>Products</h5>
                                <Row>
                                    {
                                        state.products.loadResults?(
                                            <Col md="12" className="text-center">
                                                Loading ..
                                            </Col>
                                        ):(
                                            state.products.results.map((item, i)=> (
                                                <Col lg="3" md="4" sm="6" xs="6" key={i} className="mb-2" onClick={()=>selectProduct(item)}>
                                                    <Card>
                                                        <CardBody>
                                                            <img style={{width: 100, height: 100}} className="img-thumbnail" src={`${url}/images/${item.image}`}/>
                                                            <b className="mt-2">{item.name}</b>
                                                            <h6 className="mt-2 text-warning">Rp. {ParseNumber(item.price)}</h6>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            ))
                                        )
                                    }
                                </Row>
                            </Col>
                            <Col md="5" sm="12" xs="12">
                                <h5>Order Detail</h5>
                                <Card className="mb-2">
                                    <CardHeader>
                                        <Input name="customer" value={form.customer} onChange={(e)=>changeForm(e)} placeholder="Customer Name"/>
                                    </CardHeader>
                                    <CardBody>
                                        {
                                            order.length!==0?(
                                                _.orderBy(order, ['product'],['asc']).map((item, i)=> (
                                                    <Row key={i} className="border-bottom mb-2">
                                                        <Col sm="6" xs="12" className="mb-2">
                                                            <Button size="sm" color="danger" onClick={()=>removeProduct(item.id, item.qty)}>
                                                                <FontAwesomeIcon icon={faMinus}/>
                                                            </Button> {item.product}
                                                        </Col>
                                                        <Col sm="2" xs="6">
                                                            X{item.qty}
                                                        </Col>
                                                        <Col sm="4" xs="6" className="text-right">
                                                            <h6 className="text-warning">{ParseNumber(item.price*item.qty)}</h6>
                                                        </Col>
                                                    </Row>
                                                ))
                                            ):(
                                                <div className="text-center pb-5">
                                                    Order Empty
                                                </div>
                                            )
                                        }
                                    </CardBody>
                                </Card>
                                <Row className="border-bottom mb-2">
                                    <Col sm="6" xs="12" className="mb-2">
                                        <h5>Subtotal</h5>
                                    </Col>
                                    <Col sm="6" xs="6" className="text-right">
                                        <h5 className="text-warning">{ParseNumber(form.subtotal)}</h5>
                                    </Col>
                                </Row>
                                <Button block color="primary" onClick={()=>saveOrder()}>
                                    <FontAwesomeIcon icon={faShoppingCart}/> Order
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </Container>
    )
}
const mapDispatch = {
    getProducts
}
const mapDispatchToProps = (state) => ({
    state
})
Cashier = connect(mapDispatchToProps, mapDispatch)(Cashier)
export default Cashier;