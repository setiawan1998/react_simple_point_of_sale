import React, { useState, useEffect } from 'react'
import {
    Container, Card, Button, CardHeader, CardBody, Row, Col, Table, FormGroup, Input, ButtonGroup,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPlus, faPencilAlt, faTrash, faSort } from '@fortawesome/free-solid-svg-icons'
import HeaderAdmin from '../components/headerAdmin';
import HeaderBreadcumb from '../components/headerBreadcumb';

import { connect } from 'react-redux'
import { getOrders, searchOrder, getOrder } from '../actions/orders'
import { ParseNumber } from '../config/parseNumber'
import url from '../config/url'

let Reports = ({ state, getOrders, searchOrder, getOrder }) => {
    const [modalDetailOrder, setModalDetailOrder] = useState(false);
    const toggleDetailOrder = () => setModalDetailOrder(!modalDetailOrder);
    const [form, setForm] = useState({
        customer: '',
    })
    const changeForm = async(e) => {
        e.persist();
        await setForm((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const onSearch = () => {
        searchOrder(form)
    }
    const selectOrder = (id) => {
        getOrder(id);
        setModalDetailOrder(true)
    }
    useEffect(()=>{
        getOrders()
    }, [])
    return(
        <Container fluid className="p-0">
            <HeaderAdmin type="reports"/>
            <Container className="p-3">
                <div className="pb-3">
                    <h5><FontAwesomeIcon icon={faBookmark}/> Report Orders</h5>
                </div>
                <HeaderBreadcumb title="Orders"/>
                <Card>
                    <CardHeader>
                        <ButtonGroup>
                            <Input type="search" name="customer" onChange={(e)=>changeForm(e)} placeholder="Search Customer" />
                            <Button color="primary" onClick={()=>onSearch()}>
                                Search
                            </Button>
                        </ButtonGroup>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Order Number</th>
                                    <th>Customer</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.orders.loadResults?(
                                        null
                                    ):(
                                        state.orders.results.map((item, i)=>(
                                            <tr key={i}>
                                                <td>
                                                    {item.createdAt}
                                                </td>
                                                <td>
                                                    <a href="#" onClick={()=>selectOrder(item.id)}>{item.orderNumber}</a>
                                                </td>
                                                <td>
                                                    {item.customer}
                                                </td>
                                                <td>
                                                    IDR. {ParseNumber(item.subtotal)}
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                    </Table>
                    </CardBody>
                </Card>
            </Container>
            <Modal isOpen={modalDetailOrder} toggle={toggleDetailOrder}>
                <ModalHeader toggle={toggleDetailOrder}>Detail Order</ModalHeader>
                <ModalBody>
                    {
                        state.orders.loadResult?(
                            <div className="text-center">
                                Loading ..
                            </div>
                        ):(
                            <div>
                                <div className="border-bottom">
                                    Order Number : {state.orders.result[0].orderNumber}
                                </div>
                                <div className="border-bottom">
                                    Customer : {state.orders.result[0].customer}
                                </div>
                                <div className="border-bottom">
                                    Subtotal : {ParseNumber(state.orders.result[0].subtotal)}
                                </div>
                                <div className="mt-3">
                                    Detail
                                </div>
                                {
                                    state.orders.result.map((item, i)=>(
                                        <Card key={i} className="mb-2">
                                            <CardBody>
                                                <Row>
                                                    <Col md="3" className="h6">
                                                        <img style={{width: 50, height: 50}} src={`${url}/images/${item.image}`} className="img-thumbnail"/> {item.name}
                                                    </Col>
                                                    <Col md="2" className="h6">
                                                        X {item.qty}
                                                    </Col>
                                                    <Col md="3" className="h6">
                                                        IDR. {ParseNumber(item.price)}
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    ))
                                }
                            </div>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleDetailOrder}>Close</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
const mapDispatch = {
    getOrders: getOrders,
    searchOrder: searchOrder,
    getOrder: getOrder
}
const mapDispatchToProps = (state) => ({
    state
})
Reports = connect(mapDispatchToProps, mapDispatch)(Reports)
export default Reports;