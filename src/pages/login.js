import React, { useState } from 'react'
import { 
    Container, Row, Col, Card, CardTitle, CardBody, 
    FormGroup, Label, Input, InputGroup, 
    InputGroupAddon, InputGroupText, Button
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { signin } from '../actions/users'

const Login = () => {
    const history = useHistory()
    const [form, setForm] = useState({
        'email': null,
        'password': null
    })
    const changeForm = async(e) => {
        e.persist();
        await setForm((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const onSubmit = () => {
        if(form.email===null||form.password===null){
            alert('Email or Password cannot be null')
        }else{
            signin(form).then((response)=>{
                if(response.status!==200){
                    alert(response.message)
                }else{
                    localStorage.setItem('Authorization', response.data[0].token)
                    localStorage.setItem('access', response.data[0].access)
                    localStorage.setItem('userId', response.data[0].id)
                    if(response.data[0].access==="1"){
                        history.push('/cashier')
                    }else if(response.data[0].access==="0"){
                        history.push('/')
                    }else{
                        alert('Something Wrong')
                    }
                }
            })
        }
    }
    return(
        <Container fluid className="bg-primary p-3">
            <Container>
                <h2 className="text-center text-light">Hello, Guys!</h2>
                <p className="text-center text-light">Welcome to Point of Sales</p>
                <Row className="mt-3">
                    <Col md={{ size: 6, offset: 3 }}>
                        <Card className="p-3">
                            <CardBody>
                                <CardTitle className="h5">
                                    <FontAwesomeIcon icon={faUser}/> Sign In to Your Account
                                </CardTitle>
                            </CardBody>
                            <CardBody>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="email" name="email" onChange={(e)=>changeForm(e)} placeholder="Enter Email" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <FontAwesomeIcon icon={faKey} />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="password" name="password" onChange={(e)=>changeForm(e)} placeholder="Enter Password" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup row>
                                                <Col>
                                                    <FormGroup check>
                                                        <Label check>
                                                        <Input type="checkbox" id="checkbox2" />
                                                            Keep Login
                                                        </Label>
                                                    </FormGroup>
                                                </Col>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6" className="text-right">
                                            <Button color="link" size="sm">Forgot Password?</Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <hr/>
                                <FormGroup>
                                    <Button color="primary" size="lg" block onClick={()=>onSubmit()}>
                                        <FontAwesomeIcon icon={faSignInAlt}/> Log In
                                    </Button>
                                </FormGroup>
                                <div className="text-center">
                                    <a href="/register">Not have Account? Register</a>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className="text-center mt-5 text-light">
                &copy;Copyright2020 Powered by ???
            </div>
        </Container>
    )
}
export default Login;