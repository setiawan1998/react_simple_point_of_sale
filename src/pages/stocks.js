import React, { useState, useEffect } from 'react'
import {
    Container, Card, CardBody, ButtonGroup, Button, CardHeader, Table
    , Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh, faSort, faPlus, faMinus, faPencilAlt, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import HeaderAdmin from '../components/headerAdmin';
import HeaderBreadcumb from '../components/headerBreadcumb';

import { connect } from 'react-redux'
import { getStocks, storeStock } from '../actions/stocks'
import { getProducts, getProduct } from '../actions/products'

let Stocks = ({state, getStocks, getProducts}) => {
    const [modalAddStock, setModalAddStock] = useState(false);
    const [modalReduceStock, setModalReduceStock] = useState(false);
    const [modalAdjustmentStock, setModalAdjustmentStock] = useState(false);
    const toggleAddStock = () => { 
        setForm((prevState)=>{
            return {...prevState, category: 0}
        })
        setModalAddStock(!modalAddStock);
    }
    const toggleReduceStock = () => { 
        setForm((prevState)=>{
            return {...prevState, category: 1}
        })
        setModalReduceStock(!modalReduceStock);
    }
    const toggleAdjustmentStock = () => { 
        setForm((prevState)=>{
            return {...prevState, category: 2}
        })
        setModalAdjustmentStock(!modalAdjustmentStock);
    }
    const [form, setForm] = useState({
        'productId': null,
        'category': null,
        'qty': null,
        'operator': localStorage.getItem('userId'),
        'remark': null
    })
    const changeForm = async(e) => {
        e.persist();
        await setForm((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const saveStock = () => {
        if(form.productId===null||form.qty===null){
            alert("Data cannot null")
        }else{
            storeStock(form).then((response)=>{
                if(response.status!==200){
                    alert(response.message)
                }else{
                    setForm({
                        'productId': null,
                        'category': null,
                        'qty': null,
                        'operator': localStorage.getItem('userId'),
                        'remark': null
                    })
                    setModalAddStock(false);
                    setModalReduceStock(false);
                    setModalAdjustmentStock(false);
                    getStocks()
                    getProducts()
                }
            })
        }
    }
    useEffect(()=>{
        getStocks()
        getProducts()
    },[])
    return(
        <Container fluid className="p-0">
            <HeaderAdmin type="stocks"/>
            <Container className="p-3">
                <div className="pb-3">
                    <h5><FontAwesomeIcon icon={faTh}/> Stocks</h5>
                </div>
                <HeaderBreadcumb title="Stocks"/>
                <Card>
                    <CardHeader>
                        <ButtonGroup>
                            <Button color="primary" size="sm" onClick={toggleAddStock}>
                                <FontAwesomeIcon icon={faPlus}/> Add Stock
                            </Button> 
                            <Button color="warning" size="sm" onClick={toggleReduceStock}>
                                <FontAwesomeIcon icon={faMinus}/> Reduce Stock
                            </Button> 
                            <Button color="secondary" size="sm" onClick={toggleAdjustmentStock}>
                                <FontAwesomeIcon icon={faPencilAlt}/> Adjustment Stock
                            </Button>
                        </ButtonGroup>
                    </CardHeader>
                    <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Operator</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.stocks.loadResults?(
                                        null
                                    ):(
                                        state.stocks.results.map((item, i)=>(
                                            <tr key={i}>
                                                <td>
                                                    {
                                                        item.category==="0"?(
                                                            <FontAwesomeIcon icon={faDotCircle} className="text-primary"/>
                                                        ):item.category==="1"?(
                                                            <FontAwesomeIcon icon={faDotCircle} className="text-warning"/>
                                                        ):(
                                                            <FontAwesomeIcon icon={faDotCircle} className="text-secondary"/>
                                                        )
                                                    } {item.createdAt}
                                                </td>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    {item.qty}
                                                </td>
                                                <td>
                                                    {item.email}
                                                </td>
                                                <td>
                                                    {item.remark}
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
            <Modal isOpen={modalAddStock} toggle={toggleAddStock}>
                <ModalHeader toggle={toggleAddStock}>Add Stock</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="productId">Product</Label>
                        <Input type="select" name="productId" onChange={(e)=>changeForm(e)}>
                            <option>-select product- </option>
                            {
                                state.products.loadResults?(
                                    null
                                ):(
                                    state.products.results.map((item,i)=>(
                                        <option value={item.id} onChange={(e)=>changeForm(e)} key={i}>
                                            {item.name}
                                        </option>
                                    ))
                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="qty">Quantity</Label>
                        <Input type="text" name="qty" onChange={(e)=>changeForm(e)} placeholder="Enter Quantity" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="remark">Remark</Label>
                        <Input type="textarea" name="remark" onChange={(e)=>changeForm(e)} placeholder="Remark" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleAddStock}>Cancel</Button>
                    <Button color="primary" onClick={() => saveStock()}>Save Stock</Button>
                </ModalFooter>
            </Modal>
            
            <Modal isOpen={modalReduceStock} toggle={toggleReduceStock}>
                <ModalHeader toggle={toggleReduceStock}>Reduce Stock</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="productId">Product</Label>
                        <Input type="select" name="productId" onChange={(e)=>changeForm(e)}>
                            <option>-select product- </option>
                            {
                                state.products.loadResults?(
                                    null
                                ):(
                                    state.products.results.map((item,i)=>(
                                        <option value={item.id} onChange={(e)=>changeForm(e)} key={i}>
                                            {item.name}
                                        </option>
                                    ))
                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="qty">Quantity</Label>
                        <Input type="text" name="qty" onChange={(e)=>changeForm(e)} placeholder="Enter Quantity" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="remark">Remark</Label>
                        <Input type="textarea" name="remark" onChange={(e)=>changeForm(e)} placeholder="Remark" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleReduceStock}>Cancel</Button>
                    <Button color="primary" onClick={() => saveStock()}>Save Stock</Button>
                </ModalFooter>
            </Modal>
            
            <Modal isOpen={modalAdjustmentStock} toggle={toggleAdjustmentStock}>
                <ModalHeader toggle={toggleAdjustmentStock}>Adjustment Stock</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="productId">Product</Label>
                        <Input type="select" name="productId" onChange={(e)=>changeForm(e)}>
                            <option>-select product- </option>
                            {
                                state.products.loadResults?(
                                    null
                                ):(
                                    state.products.results.map((item,i)=>(
                                        <option value={item.id} onChange={(e)=>changeForm(e)} key={i}>
                                            {item.name}
                                        </option>
                                    ))
                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="qty">Quantity</Label>
                        <Input type="text" name="qty" onChange={(e)=>changeForm(e)} placeholder="Enter Quantity" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="remark">Remark</Label>
                        <Input type="textarea" name="remark" onChange={(e)=>changeForm(e)} placeholder="Remark" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleAdjustmentStock}>Cancel</Button>
                    <Button color="primary" onClick={() => saveStock()}>Save Stock</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
const mapDispatch = {
    getStocks: getStocks,
    getProducts: getProducts
}
const mapDispatchToProps = (state) => ({
    state
})
Stocks = connect(mapDispatchToProps, mapDispatch)(Stocks)
export default Stocks;