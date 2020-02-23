import React, { useState, useEffect } from 'react'
import {
    Container, Card, Button, CardHeader, CardBody, Row, Col,
    ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup, Label, Input
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPlus, faPencilAlt, faTrash, faSort } from '@fortawesome/free-solid-svg-icons'
import HeaderAdmin from '../components/headerAdmin';
import HeaderBreadcumb from '../components/headerBreadcumb';

import { connect } from 'react-redux'
import { getProducts, storeProducts, getProduct, updateProduct, destroyProduct } from '../actions/products'
import { getCategories } from '../actions/categories'
import { ParseNumber } from '../config/parseNumber'
import url from '../config/url'

let Product = ({ state, getProducts, getCategories }) => {
    const [modalNewProduct, setModalNewProduct] = useState(false);
    const toggleNewProduct = () => setModalNewProduct(!modalNewProduct);
    const [modalEditProduct, setModalEditProduct] = useState(false);
    const toggleEditProduct = () => setModalEditProduct(!modalEditProduct);
    const [form, setForm] = useState({
        'name': null,
        'categoryId': null,
        'price': null,
        'stock': null,
        'image': null,
    })
    const [formEdit, setFormEdit] = useState({
        'id': '',
        'name': '',
        'categoryId': '',
        'price': '',
    })
    const changeForm = async(e) => {
        e.persist();
        await setForm((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const handleFile = async(e) => {
        e.persist();
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = async() => {
            await setForm(prevState=>{
                return { ...prevState, [e.target.name]: reader.result }
            })
        };
    }
    const changeFormEdit = async(e) => {
        e.persist();
        await setFormEdit((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const handleFileEdit = async(e) => {
        e.persist();
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = async() => {
            await setFormEdit(prevState=>{
                return { ...prevState, [e.target.name]: reader.result }
            })
        };
    }
    const saveProduct = () => {
        if(form.name===null||form.categoryId===null||form.price===null||form.stock===null||form.image===null){
            alert("Data cannot null")
        }else{
            storeProducts(form).then((response)=>{
                if(response.status!==200){
                    alert(response.message)
                }else{
                    setForm({
                        'name': null,
                        'categoryId': null,
                        'price': null,
                        'stock': null,
                        'image': null,
                    })
                    setModalNewProduct(false);
                    getProducts()
                }
            })
        }
    }
    const showProduct = (id) => {
        setModalEditProduct(true)
        getProduct(id).then((response)=>{
            if(response.status!==200){
                alert(response.message)
            }else{
                setFormEdit({
                    'id': response.data[0].id,
                    'name': response.data[0].name,
                    'categoryId': response.data[0].categoryId,
                    'price': response.data[0].price,
                })
            }
        })
    }
    const deleteProduct = (id) => {
        destroyProduct(id).then((response)=>{
            if(response.status!==200){
                alert(response.message)
            }else{
                getProducts()
            }
        })
    }
    const editProduct= () => {
        updateProduct(formEdit).then((response)=>{
            if(response.status!==200){
                alert(response.message)
            }else{
                setFormEdit({
                    'name': '',
                    'categoryId': '',
                    'price': '',
                })
                setModalEditProduct(false);
                getProducts()
            }
        })
    }
    useEffect(()=>{
        getProducts()
        getCategories()
    }, [])
    return(
        <Container fluid className="p-0">
            <HeaderAdmin type="products"/>
            <Container className="p-3">
                <div className="pb-3">
                    <h5><FontAwesomeIcon icon={faBookmark}/> Products</h5>
                </div>
                <HeaderBreadcumb title="Products"/>
                <Card>
                    <CardHeader>
                        <Button color="primary" size="sm" onClick={toggleNewProduct}>
                            <FontAwesomeIcon icon={faPlus}/>  New Product
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {
                            state.products.loadResults?(
                                <div className="text-center">
                                    <h6>Loading ..</h6>
                                </div>
                            ):(
                                state.products.results.map((item,i)=>(
                                    <Card key={i} className="mb-2">
                                        <CardBody>
                                            <Row>
                                                <Col md="3" className="h6">
                                                    <img style={{width: 50, height: 50}} src={`${url}/images/${item.image}`} className="img-thumbnail"/> {item.name}
                                                </Col>
                                                <Col md="2" className="h6">
                                                    {item.category}
                                                </Col>
                                                <Col md="3" className="h6">
                                                    IDR. {ParseNumber(item.price)}
                                                </Col>
                                                <Col md="2" className="h6">
                                                    Stock: {ParseNumber(item.stock)}
                                                </Col>
                                                <Col md="2">
                                                    <ButtonGroup>
                                                        <Button color="warning" onClick={()=>showProduct(item.id)} className="btn-sm"><FontAwesomeIcon icon={faPencilAlt}/> Edit</Button>
                                                        <Button color="danger" onClick={()=>deleteProduct(item.id)} className="btn-sm"><FontAwesomeIcon icon={faTrash}/> Delete</Button>
                                                    </ButtonGroup>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                ))
                            )
                        }
                    </CardBody>
                </Card>
            </Container>
            <Modal isOpen={modalNewProduct} toggle={toggleNewProduct}>
                <ModalHeader toggle={toggleNewProduct}>New Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Product Name</Label>
                        <Input type="text" name="name" onChange={(e)=>changeForm(e)} placeholder="Enter Product Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="categoryId">Category</Label>
                        <Input type="select" name="categoryId" onChange={(e)=>changeForm(e)}>
                            <option value={null}> -product category- </option>
                            {
                                state.categories.loadResults?(
                                    null
                                ):(
                                    state.categories.results.map((item, i)=>(
                                        <option key={i} value={item.id}>{item.name}</option>
                                    ))
                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="number" name="price" onChange={(e)=>changeForm(e)} placeholder="Enter Product Price" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="stock">Stock</Label>
                        <Input type="number" name="stock" onChange={(e)=>changeForm(e)} placeholder="Enter Product Stock" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input type="file" name="image" onChange={(e)=>handleFile(e)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleNewProduct}>Cancel</Button>
                    <Button color="primary" onClick={() => saveProduct()}>Save Product</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditProduct} toggle={toggleEditProduct}>
                <ModalHeader toggle={toggleEditProduct}>Edit Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Product Name</Label>
                        <Input type="text" value={formEdit.name} name="name" onChange={(e)=>changeFormEdit(e)} placeholder="Enter Product Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="categoryId">Category</Label>
                        <Input type="select" name="categoryId" onChange={(e)=>changeFormEdit(e)}>
                            {
                                state.categories.loadResults?(
                                    null
                                ):(
                                    state.categories.results.map((item, i)=>(
                                        formEdit.categoryId===item.id?(
                                            <option key={i} value={item.id} selected>{item.name}</option>
                                        ):(
                                            <option key={i} value={item.id}>{item.name}</option>
                                        )
                                    ))
                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="number" value={formEdit.price} name="price" onChange={(e)=>changeFormEdit(e)} placeholder="Enter Product Price" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input type="file" name="image" onChange={(e)=>handleFileEdit(e)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleEditProduct}>Cancel</Button>
                    <Button color="primary" onClick={() => editProduct()}>Edit Product</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
const mapDispatch = {
    getProducts: getProducts,
    getCategories: getCategories
}
const mapDispatchToProps = (state) => ({
    state
})
Product = connect(mapDispatchToProps, mapDispatch)(Product)
export default Product;