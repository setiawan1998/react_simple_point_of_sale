import React, { useState } from 'react'
import {
    Container ,Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, NavLink, Button
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import GetDimensions from './getDimension'

const HeaderCashier = (props) => {
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
                                <NavLink className={props.type==="cashier"?"bg-light text-primary rounded":"text-light"} href="/cashier">
                                    <FontAwesomeIcon icon={faHome}/> Cashier
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
export default HeaderCashier;