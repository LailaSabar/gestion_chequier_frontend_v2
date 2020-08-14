import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../Adria-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEdit } from '@fortawesome/free-regular-svg-icons';
import {  faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" style={{ width: '100px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="responsive-navbar-nav">
          <Nav className="m-auto">

            <Nav.Link className="text-uppercase ml-5 text-light" href="/demandForm" ><FontAwesomeIcon icon={faEdit} />&nbsp;Création </Nav.Link>
            <Nav.Link href="/listeDemandes" className="text-uppercase ml-5 text-light"><FontAwesomeIcon icon={faEye} /> &nbsp;Visualisation</Nav.Link>
          </Nav>
          <Nav>

            <Nav.Link href="/logout" className="text-uppercase">
              <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;Déconnexion
      </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
export default NavBar;