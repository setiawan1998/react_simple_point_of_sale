import React, { useEffect } from 'react'
import {
    Container, Row, Col, Card, CardBody, CardFooter
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faListAlt, faBookmark, faBook } from '@fortawesome/free-solid-svg-icons'
import HeaderAdmin from '../components/headerAdmin';
import { connect } from 'react-redux'
import { getOrders } from '../actions/orders'
import { getProducts } from '../actions/products'
import { getCategories } from '../actions/categories'

let Dashboard = ({state, getOrders, getProducts, getCategories}) => {
    useEffect(()=>{
        getOrders()
        getProducts()
        getCategories()
    }, [])
    return(
        <Container fluid className="p-0">
            <HeaderAdmin type="dashboard"/>
            <Container className="p-3">
                <div className="pb-3">
                    <h5><FontAwesomeIcon icon={faHome}/> Dashboard</h5>
                </div>
                <Row>
                    <Col md="4" sm="12" className="mb-3">
                        <Card>
                            <CardBody className="text-primary">
                                <Row>
                                    <Col md="8">
                                        <h4>
                                            {
                                                state.orders.loadResults?(
                                                    "loading .."
                                                ):(
                                                    state.orders.results.length
                                                )
                                            }
                                        </h4>
                                        Total Orders
                                    </Col>
                                    <Col md="4">
                                        <FontAwesomeIcon icon={faListAlt} style={{fontSize: 50}}/>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <a href="/reports">View more</a>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="4" sm="6">
                        <Card>
                            <CardBody className="text-primary">
                                <Row>
                                    <Col md="8">
                                        <h4>
                                            {
                                                state.products.loadResults?(
                                                    "loading .."
                                                ):(
                                                    state.products.results.length
                                                )
                                            }
                                        </h4>
                                        Total Products
                                    </Col>
                                    <Col md="4">
                                        <FontAwesomeIcon icon={faBookmark} style={{fontSize: 50}}/>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <a href="/products">View more</a>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="4" sm="6">
                        <Card>
                            <CardBody className="text-primary">
                                <Row>
                                    <Col md="8">
                                        <h4>
                                            {
                                                state.categories.loadResults?(
                                                    "loading .."
                                                ):(
                                                    state.categories.results.length
                                                )
                                            }
                                        </h4>
                                        Total Categories
                                    </Col>
                                    <Col md="4">
                                        <FontAwesomeIcon icon={faBookmark} style={{fontSize: 50}}/>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <a href="/categories">View more</a>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
const mapDispatch = {
    getProducts: getProducts,
    getOrders: getOrders,
    getCategories: getCategories
}
const mapDispatchToProps = (state) => ({
    state
})
Dashboard = connect(mapDispatchToProps, mapDispatch)(Dashboard)
export default Dashboard;