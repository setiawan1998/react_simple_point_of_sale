import React, { useState } from 'react'
import {
    Container ,Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, NavLink, Button
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faListAlt, faBookmark, faTh, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import GetDimensions from './getDimension'

const HeaderAdmin = (props) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const onLogOut = () => {
        localStorage.clear()
        history.push('/login')
    }
    return(
        <div>
            <Navbar color="primary" light expand="md">
                <Container>
                    <NavbarBrand className="text-light" href="/">Point of Sales</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="ml-3">
                                <NavLink className={props.type==="dashboard"?"bg-light p-2 text-primary rounded":"p-2 text-light"} href="/">
                                    <FontAwesomeIcon icon={faHome}/> Dashboard
                                </NavLink>
                            </NavItem>
                            <NavItem className="ml-3">
                                <NavLink className={props.type==="products"?"bg-light p-2 text-primary rounded":"p-2 text-light"} href="/products">
                                    <FontAwesomeIcon icon={faBookmark}/> Products
                                </NavLink>
                            </NavItem>
                            <NavItem className="ml-3">
                                <NavLink className={props.type==="categories"?"bg-light p-2 text-primary rounded":"p-2 text-light"} href="/categories">
                                    <FontAwesomeIcon icon={faBookmark}/> Categories
                                </NavLink>
                            </NavItem>
                            <NavItem className="ml-3">
                                <NavLink className={props.type==="stocks"?"bg-light p-2 text-primary rounded":"p-2 text-light"} href="/stocks">
                                    <FontAwesomeIcon icon={faTh}/> Stocks
                                </NavLink>
                            </NavItem>
                            <NavItem className="ml-3">
                                <NavLink className={props.type==="reports"?"bg-light p-2 text-primary rounded":"p-2 text-light"} href="/reports">
                                    <FontAwesomeIcon icon={faListAlt}/> Reports
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Button className="btn btn-light" onClick={()=>onLogOut()}>
                            <FontAwesomeIcon icon={faSignOutAlt}/> Log out
                        </Button>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default HeaderAdmin;