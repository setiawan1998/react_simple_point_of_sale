import React, { useState, useEffect } from 'react'
import {
    Container, Card, Button, CardHeader, CardBody, Row, Col,
    ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faPlus, faPencilAlt, faTrash, faSort } from '@fortawesome/free-solid-svg-icons'
import HeaderAdmin from '../components/headerAdmin';
import HeaderBreadcumb from '../components/headerBreadcumb';

import { connect } from 'react-redux'
import { getCategories, storeCategory, getCategory, updateCategory, destroyCategory } from '../actions/categories'

let Categories = ({ state, getCategories }) => {
    const [modalNewCategory, setModalNewCategory] = useState(false);
    const toggleNewCategory = () => setModalNewCategory(!modalNewCategory);
    const [modalEditCategory, setModalEditCategory] = useState(false);
    const toggleEditCategory = () => setModalEditCategory(!modalEditCategory);
    const [form, setForm] = useState({
        'name': null,
    })
    const changeForm = async(e) => {
        e.persist();
        await setForm((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const [formEdit, setFormEdit] = useState({
        'id': '',
        'name': '',
    })
    const changeFormEdit = async(e) => {
        e.persist();
        await setFormEdit((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const saveCategory = () => {
        if(form.name===null){
            alert("Data cannot null")
        }else{
            storeCategory(form).then((response)=>{
                if(response.status!==200){
                    alert(response.message)
                }else{
                    setForm({
                        'name': null,
                    })
                    setModalNewCategory(false);
                    getCategories()
                }
            })
        }
    }
    const showCategory = (id) => {
        setModalEditCategory(true)
        getCategory(id).then((response)=>{
            if(response.status!==200){
                alert(response.message)
            }else{
                setFormEdit({
                    'id': response.data[0].id,
                    'name': response.data[0].name,
                })
            }
        })
    }
    const editCategory = () => {
        updateCategory(formEdit).then((response)=>{
            if(response.status!==200){
                alert(response.message)
            }else{
                setForm({
                    'name': null,
                })
                setModalEditCategory(false);
                getCategories()
            }
        })
    }
    const deleteCategory = (id) => {
        destroyCategory(id).then((response)=>{
            if(response.status!==200){
                alert(response.message)
            }else{
                getCategories()
            }
        })
    }
    useEffect(()=>{
        getCategories()
    }, [])
    return(
        <Container fluid className="p-0">
            <HeaderAdmin type="categories"/>
            <Container className="p-3">
                <div className="pb-3">
                    <h5><FontAwesomeIcon icon={faBookmark}/> Categories</h5>
                </div>
                <HeaderBreadcumb title="categories"/>
                <Card>
                    <CardHeader>
                        <Button color="primary" size="sm" onClick={toggleNewCategory}>
                            <FontAwesomeIcon icon={faPlus}/>  New Categories
                        </Button>
                    </CardHeader>
                    <CardBody>
                        {
                            state.categories.loadResults?(
                                <div className="text-center">
                                    <h6>Loading ..</h6>
                                </div>
                            ):(
                                state.categories.results.map((item,i)=>(
                                    <Card key={i} className="mb-2">
                                        <CardBody>
                                            <Row>
                                                <Col md="8" className="h6">
                                                    {item.name}
                                                </Col>
                                                <Col md="4" className="text-right">
                                                    <ButtonGroup>
                                                        <Button color="warning" onClick={()=>showCategory(item.id)} className="btn-sm"><FontAwesomeIcon icon={faPencilAlt}/> Edit</Button>
                                                        <Button color="danger" onClick={()=>deleteCategory(item.id)} className="btn-sm"><FontAwesomeIcon icon={faTrash}/> Delete</Button>
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
            <Modal isOpen={modalNewCategory} toggle={toggleNewCategory}>
                <ModalHeader toggle={toggleNewCategory}>New Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Category Name</Label>
                        <Input type="text" name="name" onChange={(e)=>changeForm(e)} placeholder="Enter Category Name" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleNewCategory}>Cancel</Button>
                    <Button color="primary" onClick={() => saveCategory()}>Save Category</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditCategory} toggle={toggleEditCategory}>
                <ModalHeader toggle={toggleEditCategory}>Edit Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Category Name</Label>
                        <Input type="text" value={formEdit.name} name="name" onChange={(e)=>changeFormEdit(e)} placeholder="Enter Category Name" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleEditCategory}>Cancel</Button>
                    <Button color="primary" onClick={() => editCategory()}>Save Category</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}
const mapDispatch = {
    getCategories: getCategories
}
const mapDispatchToProps = (state) => ({
    state
})
Categories = connect(mapDispatchToProps, mapDispatch)(Categories)
export default Categories;