import React, { useState } from 'react'
import { 
    Container, Row, Col, Card, CardTitle, CardBody, 
    FormGroup, Label, Input, InputGroup, 
    InputGroupAddon, InputGroupText, Button
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faKey, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { signup } from '../actions/users'

const Register = () => {
    const history = useHistory()
    const [form, setForm] = useState({
        'email': null,
        'password': null,
        'access': null
    })
    const changeForm = async(e) => {
        e.persist();
        await setForm((prevState)=>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const onSubmit = () => {
        if(form.email===null||form.password===null||form.access===null){
            alert('Email or Password or access cannot be null')
        }else{
            signup(form).then((response)=>{
                if(response.status!==200){
                    alert(response.message)
                }else{
                    alert('Register Success')
                    history.push('/login')
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
                                    <FontAwesomeIcon icon={faUser}/> Register
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
                                    <Label for="access">Access</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <FontAwesomeIcon icon={faUser} />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="select" name="access" onChange={(e)=>changeForm(e)}>
                                            <option value={null}>-select access-</option>
                                            <option value="0">Admin</option>
                                            <option value="1">Cashier</option>
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                                <hr/>
                                <FormGroup>
                                    <Button color="primary" size="lg" block onClick={()=>onSubmit()}>
                                        <FontAwesomeIcon icon={faSignInAlt}/> Register
                                    </Button>
                                </FormGroup>
                                <div className="text-center">
                                    <a href="/login">I have Account</a>
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
export default Register;